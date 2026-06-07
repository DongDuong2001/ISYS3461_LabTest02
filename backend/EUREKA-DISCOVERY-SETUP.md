# Wonder Tour - Eureka Discovery Server Setup

## Architecture Overview

The Wonder Tour system now uses **Netflix Eureka** for service discovery in a microservices architecture.

### Services

1. **Eureka Server** (Port 8761) - Service Registry & Discovery
2. **API Gateway** (Port 10000) - Routes requests using service discovery
3. **Tour Service** (Port 8080) - Tour management microservice
4. **Company Service** (Port 8085) - Company management microservice

## Service Discovery Flow

```
Client Request → API Gateway (10000)
                      ↓
              Eureka Server (8761)
              (Discovers service)
                      ↓
        Tour Service (8080) / Company Service (8085)
```

## Key Features

### Eureka Server
- **URL**: http://localhost:8761
- **Dashboard**: http://localhost:8761 (view all registered services)
- Centralized service registry
- Health monitoring
- Self-preservation mode disabled for development

### API Gateway
- Uses `lb://service-name` URIs for load-balanced routing
- Automatically discovers services from Eureka
- Routes:
  - `/tours/**` → Tour Service
  - `/companies/**` → Company Service

### Microservices (Tour & Company)
- Automatically register with Eureka on startup
- Send heartbeats for health checks
- Can be scaled horizontally (multiple instances)

## Starting the System

### Option 1: Start All Services Individually

```powershell
# 1. Start Eureka Server (MUST start first)
cd backend/eureka-server
java -jar target/eureka-server-1.0.0.jar

# 2. Start Company Service (wait 10 seconds after Eureka)
cd backend/company-service
java -jar target/company-service-1.0.0.jar

# 3. Start Tour Service
cd backend/tour-service
java -jar target/tour-service-1.0.0.jar

# 4. Start API Gateway (start last)
cd backend/api-gateway
java -jar target/api-gateway-1.0.0.jar
```

### Option 2: PowerShell Script (Run all together)

Run this script from the repository root:

```powershell
$repoRoot = (Resolve-Path ".").Path

# Start Eureka Server
Start-Process powershell `
  -ArgumentList "-NoExit", "-Command", "mvn spring-boot:run" `
  -WorkingDirectory "$repoRoot\backend\eureka-server"

# Wait for Eureka to start
Start-Sleep -Seconds 15

# Start Company Service
Start-Process powershell `
  -ArgumentList "-NoExit", "-Command", "mvn spring-boot:run" `
  -WorkingDirectory "$repoRoot\backend\company-service"

# Start Tour Service
Start-Process powershell `
  -ArgumentList "-NoExit", "-Command", "mvn spring-boot:run" `
  -WorkingDirectory "$repoRoot\backend\tour-service"

# Wait for services to register
Start-Sleep -Seconds 15

# Start API Gateway
Start-Process powershell `
  -ArgumentList "-NoExit", "-Command", "mvn spring-boot:run" `
  -WorkingDirectory "$repoRoot\backend\api-gateway"
```

## Verifying the Setup

### 1. Check Eureka Dashboard
Visit: http://localhost:8761

You should see:
- TOUR-SERVICE
- COMPANY-SERVICE
- API-GATEWAY

All showing status **UP**

### 2. Test API Gateway Routes

```bash
# Get tours (via service discovery)
curl "http://localhost:10000/tours?page=1&limit=5"

# Get companies dropdown
curl http://localhost:10000/companies/dropdown

# Get specific company
curl http://localhost:10000/companies/1
```

### 3. Check Service Ports

```powershell
netstat -ano | findstr ":8080 :8085 :8761 :10000"
```

Expected connections:
- Services will have ESTABLISHED connections to Eureka (8761)
- All ports should be LISTENING

## Configuration Files

### Eureka Server (`eureka-server/src/main/resources/application.yml`)
```yaml
server:
  port: 8761

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
```

### API Gateway (`api-gateway/src/main/resources/application.yml`)
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: tour-service
          uri: lb://tour-service  # Load balanced using Eureka
          predicates:
            - Path=/tours/**

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

### Microservices (`application.properties`)
```properties
spring.application.name=tour-service  # or company-service

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
```

## Benefits of Service Discovery

1. **Dynamic Service Location**: No hardcoded URLs
2. **Load Balancing**: Distribute requests across multiple instances
3. **Fault Tolerance**: Automatically remove failed services
4. **Scalability**: Add/remove service instances without code changes
5. **Health Monitoring**: Track service status in real-time

## Troubleshooting

### Service not registering with Eureka
- Ensure Eureka Server started first
- Check `eureka.client.service-url.defaultZone` is correct
- Verify `spring.application.name` is set

### API Gateway cannot find service
- Wait 30 seconds after service startup for registration
- Check Eureka dashboard shows service as UP
- Verify route URIs use `lb://` prefix

### Port already in use
```powershell
# Find process using port
netstat -ano | findstr :8761

# Kill process
taskkill /PID <process_id> /F
```

## Current Status

**All services running and registered:**
- Eureka Server: http://localhost:8761
- API Gateway: http://localhost:10000
- Tour Service: http://localhost:8080 (registered as TOUR-SERVICE)
- Company Service: http://localhost:8085 (registered as COMPANY-SERVICE)
- Frontend: http://localhost:3000

Frontend calls the API Gateway at http://localhost:10000 by default.

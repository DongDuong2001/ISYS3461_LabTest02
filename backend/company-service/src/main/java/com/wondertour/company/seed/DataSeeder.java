package com.wondertour.company.seed;

import com.wondertour.company.model.Company;
import com.wondertour.company.repository.CompanyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CompanyRepository companyRepository;

    public DataSeeder(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public void run(String... args) {
        if (companyRepository.count() > 0) {
            System.out.println("Companies already seeded. Skipping...");
            return;
        }

        List<Company> companies = List.of(
                createCompany("Vietnam Horizon Travel", "Vietnam", 500000),
                createCompany("Siam Adventure Tours", "Thailand", 750000),
                createCompany("Nusantara Explorer", "Indonesia", 300000)
        );

        companyRepository.saveAll(companies);
        System.out.println("Seeded " + companies.size() + " companies.");
    }

    private Company createCompany(String name, String country, double revenue) {
        Company company = new Company();
        company.setName(name);
        company.setCountry(country);
        company.setRevenue(revenue);
        return company;
    }
}

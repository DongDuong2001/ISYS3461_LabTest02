package com.wondertour.company.controller;

import com.wondertour.company.dto.CompanyDropdownDTO;
import com.wondertour.company.dto.CompanyProfileDTO;
import com.wondertour.company.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<CompanyDropdownDTO>> getCompanyDropdown() {
        return ResponseEntity.ok(companyService.getCompanyDropdown());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyProfileDTO> getCompanyProfile(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompanyProfile(id));
    }
}

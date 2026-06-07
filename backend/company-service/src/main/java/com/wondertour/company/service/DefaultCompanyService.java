package com.wondertour.company.service;

import com.wondertour.company.client.CountryFlagClient;
import com.wondertour.company.dto.CompanyDropdownDTO;
import com.wondertour.company.dto.CompanyProfileDTO;
import com.wondertour.company.exception.ResourceNotFoundException;
import com.wondertour.company.model.Company;
import com.wondertour.company.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultCompanyService implements CompanyService {

    private final CompanyRepository companyRepository;
    private final CountryFlagClient countryFlagClient;

    public DefaultCompanyService(
            CompanyRepository companyRepository,
            CountryFlagClient countryFlagClient
    ) {
        this.companyRepository = companyRepository;
        this.countryFlagClient = countryFlagClient;
    }

    @Override
    public List<CompanyDropdownDTO> getCompanyDropdown() {
        return companyRepository.findAllByOrderByNameAsc().stream()
                .map(company -> new CompanyDropdownDTO(company.getId(), company.getName()))
                .toList();
    }

    @Override
    public CompanyProfileDTO getCompanyProfile(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Company not found with id " + id
                ));

        return new CompanyProfileDTO(
                company.getId(),
                company.getName(),
                company.getCountry(),
                company.getRevenue(),
                countryFlagClient.getFlagUrl(company.getCountry()).orElse(null)
        );
    }
}

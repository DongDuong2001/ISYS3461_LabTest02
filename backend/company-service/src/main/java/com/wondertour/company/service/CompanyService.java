package com.wondertour.company.service;

import com.wondertour.company.dto.CompanyDropdownDTO;
import com.wondertour.company.dto.CompanyProfileDTO;

import java.util.List;

public interface CompanyService {

    List<CompanyDropdownDTO> getCompanyDropdown();

    CompanyProfileDTO getCompanyProfile(Long id);
}

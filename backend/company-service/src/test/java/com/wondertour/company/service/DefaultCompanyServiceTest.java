package com.wondertour.company.service;

import com.wondertour.company.client.CountryFlagClient;
import com.wondertour.company.dto.CompanyProfileDTO;
import com.wondertour.company.exception.ResourceNotFoundException;
import com.wondertour.company.model.Company;
import com.wondertour.company.repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DefaultCompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private CountryFlagClient countryFlagClient;

    private DefaultCompanyService companyService;

    @BeforeEach
    void setUp() {
        companyService = new DefaultCompanyService(
                companyRepository,
                countryFlagClient
        );
    }

    @Test
    void returnsCompanyProfileWithFlagUrl() {
        Company company = new Company(
                1L,
                "Vietnam Horizon Travel",
                "Vietnam",
                500000
        );
        when(companyRepository.findById(1L)).thenReturn(Optional.of(company));
        when(countryFlagClient.getFlagUrl("Vietnam"))
                .thenReturn(Optional.of("https://flag.example/vietnam.png"));

        CompanyProfileDTO profile = companyService.getCompanyProfile(1L);

        assertThat(profile.getName()).isEqualTo("Vietnam Horizon Travel");
        assertThat(profile.getCountry()).isEqualTo("Vietnam");
        assertThat(profile.getFlagUrl())
                .isEqualTo("https://flag.example/vietnam.png");
    }

    @Test
    void rejectsUnknownCompany() {
        when(companyRepository.findById(404L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> companyService.getCompanyProfile(404L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("404");
    }
}

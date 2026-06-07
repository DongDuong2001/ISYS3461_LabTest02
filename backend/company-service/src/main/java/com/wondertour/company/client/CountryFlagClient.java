package com.wondertour.company.client;

import java.util.Optional;

public interface CountryFlagClient {

    Optional<String> getFlagUrl(String countryName);
}

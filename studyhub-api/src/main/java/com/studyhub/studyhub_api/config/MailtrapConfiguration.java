package com.studyhub.studyhub_api.config;

import io.mailtrap.client.MailtrapClient;
import io.mailtrap.config.MailtrapConfig;
import io.mailtrap.factory.MailtrapClientFactory;
import io.mailtrap.model.request.emails.Address;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailtrapConfiguration {

    @Bean
    public MailtrapClient mailtrapClient(@Value("${mailtoken}") String token) {
        MailtrapConfig config = new MailtrapConfig.Builder()
                .sandbox(true)
                .inboxId(4114181L)
                .token(token)
                .build();
        return MailtrapClientFactory.createMailtrapClient(config);
    }

    @Bean
    public Address supportAddress() {
        return new Address("support@studyhub.vn", "StudyHub");
    }
}

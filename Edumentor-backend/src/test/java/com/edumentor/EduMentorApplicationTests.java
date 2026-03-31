package com.edumentor;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "jwt.secret=test-secret-key-that-is-long-enough-256-bits-ok",
    "jwt.expiration=3600000"
})
class EduMentorApplicationTests {

    @Test
    void contextLoads() {
        // Verifies the Spring context starts successfully
    }
}

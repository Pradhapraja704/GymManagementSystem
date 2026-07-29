package com.gymmanagement.config;

import com.gymmanagement.entity.Role;
import com.gymmanagement.entity.User;
import com.gymmanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (!userRepository.existsByUsername("admin")) {

            User admin = new User();

            admin.setFullName("System Administrator");
            admin.setUsername("admin");
            admin.setEmail("admin@gym.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);

            userRepository.save(admin);

            System.out.println("========================================");
            System.out.println("Default Admin User Created");
            System.out.println("Username : admin");
            System.out.println("Password : admin123");
            System.out.println("========================================");
        }
    }
}
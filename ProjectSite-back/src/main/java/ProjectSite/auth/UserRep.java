package ProjectSite.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRep extends JpaRepository<User, Long> {
    User findByLogin(String login);

    int countByLogin(String login);
}

package ProjectSite.auth;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRep extends JpaRepository<User, Long> {
    User findByLogin(String login);

    int countByLogin(String login);
}

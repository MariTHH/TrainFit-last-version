package ProjectSite.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/register")
    public void register(@RequestParam("login") String login, @RequestParam("password") String password) {
        authService.register(login, password);
    }

    @PostMapping("/api/login")
    public void login(@RequestHeader("Authorization") String authorization) {
        authService.check(authorization);
    }

    @PostMapping("/api/params")
    public void params(@RequestParam("login") String login, @RequestParam("username") String username,@RequestParam("sex") String sex, @RequestParam("weight") String weight) {
        authService.addParams(login,username, sex, weight);
    }
    @PostMapping("/api/getParams")
    public String param(@RequestParam("login") String login) {
        return authService.getParams(login);
    }
}

package ProjectSite.auth;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Service
public class AuthService {
    private final UserRep userRepository;

    public AuthService(UserRep userRepository) {
        this.userRepository = userRepository;
    }

    public void register(String login, String password) {
        if (userRepository.findByLogin(login) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Login has been taken");
        }

        User user = new User(login, getHash(password), null, null);
        userRepository.save(user);
    }

    public void addParams(String login, String username, String sex, String weight) {

        long count = userRepository.countByLogin(username);
        if (count > 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Login has been taken");
        }

        User user = userRepository.findByLogin(login);
        if (!username.equals("")) {
            user.setLogin(username);
        }
        if (!sex.equals("")) {
            user.setSex(sex);
        }
        if (!weight.equals("")) {
            user.setWeight(weight);
        }
        userRepository.save(user);

    }

    public String check(String authorization) {
        if (authorization == null || !authorization.startsWith("Basic"))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Authorization header");

        String login, password;

        try {
            String base64 = authorization.substring("Basic".length()).trim();
            String[] credentials = new String(Base64.getDecoder().decode(base64)).split(":", 2);
            if (credentials.length < 2)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Authorization header");
            login = credentials[0];
            password = credentials[1];
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid base64");
        }

        User user = userRepository.findByLogin(login);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name", user.getLogin());
        jsonObject.put("weight", user.getWeight());
        jsonObject.put("sex", user.getSex());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login");
        }

        if (!getHash(password).equals(user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        return jsonObject.toString();
    }

    private String getHash(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());

            StringBuilder hexBuilder = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexBuilder.append('0');
                hexBuilder.append(hex);
            }
            return hexBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }


    public String getParams(String login) {
        User user = userRepository.findByLogin(login);
        return user.getWeight();

    }

}

package pl.kociak.website.backend;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plugins")
public class PluginMapping {
    @GetMapping("/get/{name}")
    public ResponseEntity<String> handleGetRequest(@PathVariable String name) {
        try {
            String filePathStr = name + "/response.json";
            ClassPathResource resource = new ClassPathResource(filePathStr);

            if (!resource.exists()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            String content = new String(resource.getInputStream().readAllBytes());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(content);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/{name}/config.yml")
    public ResponseEntity<String> getConfigFile(@PathVariable String name) {
        try {
            String filePathStr = name + "/config.yml";
            ClassPathResource resource = new ClassPathResource(filePathStr);

            if (!resource.exists()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            String content = new String(resource.getInputStream().readAllBytes());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(content);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

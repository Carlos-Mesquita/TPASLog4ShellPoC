package tpas.poc.log4shell.controllers;

import tpas.poc.log4shell.components.LoggerManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import java.util.Map;

@RestController
@RequestMapping("/api/logger")
public class LoggerController {

    private static final Logger logger = LogManager.getLogger(LoggerController.class);

    @Autowired
    private LoggerManager loggerManager;

    @PostMapping("/toggle")
    @ResponseStatus(HttpStatus.OK)
    public String toggleLogger(@RequestBody Map<String, String> requestBody) {
        String type = requestBody.get("type");

        if (!"safe".equalsIgnoreCase(type) && !"vulnerable".equalsIgnoreCase(type)) {
            return "Invalid logger type!";
        }

        String msg = "Logger type successfully changed to: " + type;
        logger.info(msg);
        loggerManager.setLoggerType(type);
        return msg;
    }

    @GetMapping("/type")
    @ResponseStatus(HttpStatus.OK)
    public String getLoggerType() {
        return loggerManager.getLoggerType();
    }

}
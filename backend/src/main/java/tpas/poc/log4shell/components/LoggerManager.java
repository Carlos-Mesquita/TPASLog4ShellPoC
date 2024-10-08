package tpas.poc.log4shell.components;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Component
public class LoggerManager {

    private final Logger logger = LogManager.getLogger(LoggerManager.class);

    private String loggerType = "vulnerable";

    public void setLoggerType(String loggerType) { this.loggerType = loggerType; }

    public String getLoggerType() { return this.loggerType; }

    // Naive log sanitization, use this to simulate a WAF bypass
    private String sanitizeInput(String input) {
        if (input == null || input.isEmpty()) return null;

        Pattern pattern = Pattern.compile("\\$\\{jndi:.*?}");
        Matcher matcher = pattern.matcher(input);
        return matcher.replaceAll("[REMOVED_JNDI_LOOKUP]");
    }

    public void log(String message) {
        String msg = "vulnerable".equals(this.loggerType) ? message : this.sanitizeInput(message);
        this.logger.info(msg);
    }
}
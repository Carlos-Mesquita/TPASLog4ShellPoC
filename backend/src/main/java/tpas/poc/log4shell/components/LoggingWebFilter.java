package tpas.poc.log4shell.components;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import reactor.core.publisher.SignalType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.net.InetSocketAddress;
import java.util.UUID;


@Component
public class LoggingWebFilter implements WebFilter {

    private final LoggerManager loggerManager;

    @Autowired
    public LoggingWebFilter(LoggerManager loggerManager) {
        this.loggerManager = loggerManager;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String requestId = UUID.randomUUID().toString();

        long startTime = System.currentTimeMillis();
        ServerHttpRequest request = exchange.getRequest();
        String method = request.getMethod().name();
        String path = request.getURI().getRawPath();
        String queryParams = request.getURI().getQuery();
        HttpHeaders headers = request.getHeaders();
        String clientIP = getClientIp(request);

        String message = "\n=== Request Received ===\n" +
                String.format("Request ID   : %s\n", requestId) +
                String.format("Client IP    : %s\n", clientIP) +
                String.format("Method       : %s\n", method) +
                String.format("Path         : %s\n", path) +
                String.format("Query Params : %s\n", queryParams) +
                String.format("Headers      : %s\n", headers) +
                "========================";
        this.loggerManager.log(message);

        return chain.filter(exchange)
                .doOnEach(signal -> {
                    if (signal.getType() == SignalType.ON_COMPLETE || signal.getType() == SignalType.ON_ERROR) {
                        ServerHttpResponse response = exchange.getResponse();
                        HttpStatus statusCode = response.getStatusCode();
                        long duration = System.currentTimeMillis() - startTime;

                        if (signal.isOnError()) {
                            Throwable error = signal.getThrowable();
                            String errorMessage =  error == null ? "N/A" : error.getMessage();
                            String failed = "\n=== Request Failed ===\n" +
                                    String.format("Request ID   : %s\n", requestId) +
                                    String.format("Status Code  : %s\n", (statusCode != null ? statusCode.value() : "N/A")) +
                                    String.format("Duration     : %s ms\n", duration) +
                                    String.format("Error        : %s\n", errorMessage) +
                                    "======================";
                            this.loggerManager.log(failed);
                        } else {
                            String completed = "\n=== Request Completed ===\n" +
                                    String.format("Request ID   : %s\n", requestId) +
                                    String.format("Status Code  : %s\n", (statusCode != null ? statusCode.value() : "N/A")) +
                                    String.format("Duration     : %s ms\n", duration) +
                                    "===========================";
                            this.loggerManager.log(completed);
                        }
                    }
                });
    }

    private String getClientIp(ServerHttpRequest request) {
        InetSocketAddress remoteAddress = request.getRemoteAddress();
        return remoteAddress != null ? remoteAddress.getAddress().getHostAddress() : "Unknown";
    }
}

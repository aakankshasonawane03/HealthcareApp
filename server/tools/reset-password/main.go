package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	fmt.Print("Enter your new patient password: ")

	reader := bufio.NewReader(os.Stdin)
	password, err := reader.ReadString('\n')
	if err != nil && len(password) == 0 {
		fmt.Println("Failed to read password:", err)
		return
	}

	password = strings.TrimRight(password, "\r\n")
	if password == "" {
		fmt.Println("Password cannot be empty")
		return
	}

	hash, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		fmt.Println("Hash generation failed:", err)
		return
	}

	fmt.Println("Generated bcrypt hash:")
	fmt.Println(string(hash))
}

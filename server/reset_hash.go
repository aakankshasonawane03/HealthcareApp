package main

import (
    "fmt"
    "golang.org/x/crypto/bcrypt"
)

func main() {
    var password string

    fmt.Print("Enter your new password: ")
    fmt.Scanln(&password)

    hash, err := bcrypt.GenerateFromPassword(
        []byte(password),
        bcrypt.DefaultCost,
    )

    if err != nil {
        panic(err)
    }

    fmt.Println("Bcrypt hash:")
    fmt.Println(string(hash))
}
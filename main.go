package main

import (
	"net/http"
	"typespeed/router"

	"github.com/gin-gonic/gin"
)

func main() {

	router := router.CreateRoute()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "api is running on port 8080",
		})
	})

	router.Run("localhost:8080")
}
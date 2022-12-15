package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateToken(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "users api is working perfectly fine",
	})
}

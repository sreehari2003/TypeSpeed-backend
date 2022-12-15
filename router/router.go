package router

import (
	"typespeed/controller"

	"github.com/gin-gonic/gin"
)

func CreateRoute() *gin.Engine {
	router := gin.Default()

	users := router.Group("/users")
	{
		users.GET("/", controller.CreateToken)
		// users.GET("/:id", controller.CreateToken)
	}
	return router
}

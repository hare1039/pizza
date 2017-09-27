package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/olebedev/staticbin"
	"os"
)

func main() {
	r := gin.Default()
	r.Use(staticbin.Static(Asset, staticbin.Options{
		Dir: "/",
	}))

	port := os.Getenv("PORT")
	if port == "" {
		port = "10000"
		fmt.Println("Listening port can be change by `export PORT=xxxx`")
	}
	fmt.Println("Please open your browser and go to http://localhost:10000/")
	r.Run(":" + port)
}

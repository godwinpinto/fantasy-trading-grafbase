package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/pusher/pusher-http-go/v5"
)

type ResponseStruct struct {
	Status string `json:"status"`
}
type RequestStruct struct {
	Data    string `json:"data"`
	Event   string `json:"event"`
	Channel string `json:"channel"`
}

func SendMessage(w http.ResponseWriter, request *http.Request) {

	if request.Method != http.MethodPost {
		http.Error(w, "Invalid HTTP method", http.StatusMethodNotAllowed)
		return
	}

	var req RequestStruct
	decoder := json.NewDecoder(request.Body)
	if err := decoder.Decode(&req); err != nil {
		http.Error(w, "Failed to parse JSON request", http.StatusBadRequest)
		return
	}

	APP_ID := os.Getenv("APP_ID")
	APP_KEY := os.Getenv("APP_KEY")
	APP_SECRET := os.Getenv("APP_SECRET")
	APP_CLUSTER := os.Getenv("APP_CLUSTER")

	pusherClient := pusher.Client{
		AppID:   APP_ID,
		Key:     APP_KEY,
		Secret:  APP_SECRET,
		Cluster: APP_CLUSTER,
		Secure:  true,
	}

	err := pusherClient.Trigger(req.Channel, req.Event, req.Data)
	if err != nil {
		fmt.Println(err.Error())
	}

	response := ResponseStruct{
		Status: "OK",
	}

	// Convert the array of structs to JSON
	data, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

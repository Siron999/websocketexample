package com.example.demo.controller;

import com.example.demo.dto.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/public-message")
    @SendTo("/global/message")
    public MessageDTO sendMessage(@Payload MessageDTO messageDTO) {
        System.out.println("Message Received" + messageDTO.toString());
        return messageDTO;
    }

    @MessageMapping("/private-message")
    public MessageDTO sendPrivateMessage(@Payload MessageDTO messageDTO) {
        System.out.println("private Message Received" + messageDTO.toString());
        simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName(),"message",messageDTO); //user/username/private
        return messageDTO;
    }
}

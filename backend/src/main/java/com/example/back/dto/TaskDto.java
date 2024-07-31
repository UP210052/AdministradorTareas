package com.example.back.dto;

import java.util.*;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import lombok.Data;
@Data
public class TaskDto {
    private Long id;
    private String name;
    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private String status;
    private Long projectId;
    private List<Long> userIds;
}
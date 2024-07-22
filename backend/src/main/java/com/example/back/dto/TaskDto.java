package com.example.back.dto;

import java.util.*;

import java.time.LocalDate;
import lombok.Data;
@Data
public class TaskDto {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Long projectId;
    private List<Long> userIds;
}
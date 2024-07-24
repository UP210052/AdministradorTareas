package com.example.back.dto;

import java.util.*;

import java.time.LocalDate;
import lombok.Data;
@Data
public class ProjectDto {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Long userLeaderId;
    private List<Long> userIds;
}
package com.example.back.mapper;

import com.example.back.dto.UserDto;
import com.example.back.models.UserModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto userToUserDto(UserModel userModel);

    UserModel userDtoToUserModel(UserDto userDto);

    @Mapping(target = "id", ignore = true)
    UserDto createUserDtoWithoutId(UserModel userModel);
}

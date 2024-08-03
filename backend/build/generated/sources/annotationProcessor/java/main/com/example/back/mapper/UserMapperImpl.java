package com.example.back.mapper;

import com.example.back.dto.UserDto;
import com.example.back.models.UserModel;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-01T01:00:40-0600",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.8.jar, environment: Java 17.0.10 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto userToUserDto(UserModel userModel) {
        if ( userModel == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        if ( userModel.getId() != null ) {
            userDto.setId( userModel.getId().intValue() );
        }
        userDto.setNombre( userModel.getNombre() );
        userDto.setEmail( userModel.getEmail() );
        userDto.setPassword( userModel.getPassword() );

        return userDto;
    }

    @Override
    public UserModel userDtoToUserModel(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        UserModel userModel = new UserModel();

        userModel.setNombre( userDto.getNombre() );
        userModel.setEmail( userDto.getEmail() );
        userModel.setPassword( userDto.getPassword() );
        userModel.setId( (long) userDto.getId() );

        return userModel;
    }

    @Override
    public UserDto createUserDtoWithoutId(UserModel userModel) {
        if ( userModel == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setNombre( userModel.getNombre() );
        userDto.setEmail( userModel.getEmail() );
        userDto.setPassword( userModel.getPassword() );

        return userDto;
    }
}

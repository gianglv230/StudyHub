package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.course.AddCourseRequest;
import com.studyhub.studyhub_api.dto.request.course.UpdateCourseRequest;
import com.studyhub.studyhub_api.dto.response.course.AdminCourseResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseAdminResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseDetailLiteResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteResponse;
import com.studyhub.studyhub_api.model.Course;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {LessonMapper.class, ResourceMapper.class})
public interface CourseMapper {

    @Mappings({
            @Mapping(target = "courseId", source = "id"),
            @Mapping(target = "thumbnail", source = "thumbnail.url")
    })
    CourseLiteResponse toCourseLiteResponse(Course course);

    @Mappings({
            @Mapping(target = "courseId", source = "id"),
            @Mapping(target = "video", source = "videoDemo.url")
    })
    CourseDetailLiteResponse toCourseLiteDetailResponse(Course course);

    @Mappings({
            @Mapping(target = "courseId", source = "course.id"),
            @Mapping(target = "thumbnail", source = "course.thumbnail.url"),
            @Mapping(target = "createdBy", source = "createdBy"),
            @Mapping(target = "updatedBy", source = "updatedBy")
    })
    CourseAdminResponse toCourseAdminResponse(Course course, String createdBy, String updatedBy);

    @Mappings({
            @Mapping(target = "createdBy", source = "createdBy"),
            @Mapping(target = "updatedBy", source = "updatedBy")
    })
    AdminCourseResponse toAdminCourseResponse(Course course, String createdBy, String updatedBy);

    @Mappings({
            @Mapping(target = "thumbnail.id", source = "thumbnailId"),
            @Mapping(target = "videoDemo.id", source = "videoId")
    })
    Course toCourse(AddCourseRequest request);

    // Hàm này sẽ tự động chạy sau khi hàm toCourse thực hiện xong
//    @AfterMapping
//    default void handleBlankResources(AddCourseRequest request, @MappingTarget Course course) {
//        if (course.getThumbnail() != null && course.getThumbnail().getId() == null) {
//            course.setThumbnail(null); // Trả về null xịn
//        }
//
//        if (course.getVideoDemo() != null && course.getVideoDemo().getId() == null) {
//            course.setVideoDemo(null); // Trả về null xịn
//        }
//    }

    @Mappings({
            @Mapping(target = "thumbnail.id", source = "thumbnailId"),
            @Mapping(target = "videoDemo.id", source = "videoId")
    })
    void updateCourse(UpdateCourseRequest request, @MappingTarget Course course);
}

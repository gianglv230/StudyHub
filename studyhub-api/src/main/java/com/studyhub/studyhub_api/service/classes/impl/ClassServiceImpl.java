package com.studyhub.studyhub_api.service.classes.impl;

import com.studyhub.studyhub_api.dto.request.classes.AddClassRequest;
import com.studyhub.studyhub_api.dto.request.classes.ClassFilterRequest;
import com.studyhub.studyhub_api.dto.request.classes.UpdateClassRequest;
import com.studyhub.studyhub_api.dto.request.classes.UpdateClassStatusRequest;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.*;
import com.studyhub.studyhub_api.enums.Role;
import com.studyhub.studyhub_api.enums.StatusClass;
import com.studyhub.studyhub_api.enums.StatusEnrollment;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.mapper.ClassMapper;
import com.studyhub.studyhub_api.model.Course;
import com.studyhub.studyhub_api.model.Invoice;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.*;
import com.studyhub.studyhub_api.repository.specification.ClassSpecification;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.classes.ClassService;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ClassServiceImpl implements ClassService {
    AuthenticationService authService;
    UserAccountService userAccountService;
    ClassRepository classRepository;
    EnrollmentRepository enrollmentRepository;
    //    ContentRepository contentRepository;
    SectionRepository sectionRepository;
    UserAccountRepository userAccountRepository;
    CourseRepository courseRepository;
    ClassMapper classMapper;
    private static final int MAX_ITEM = 20;
    private static final int MAX_ITEM_BENTO = 9;

    // Get class by filter
    @Override
    public PageResponse<ClassLiteResponse> getClassFilter(int page, String subject, String targetGrade, String categoryName) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);

        var pageData = classRepository.filterClasses(subject, targetGrade, categoryName, pageable);

        return PageResponse.<ClassLiteResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(classMapper::toClassLiteResponse).toList())
                .build();
    }

    // Get class of course
    @Override
    public List<ClassLiteResponse> getAllClassesOfCourse(String courseSlug) {
        List<Class> classes = classRepository.getAllClassesOfCourse(courseSlug);
        return classes.stream().map(classMapper::toClassLiteResponse).toList();
    }

    // Get class of teacher
//    @Override
//    public PageResponse<ClassLiteResponse> getAllClassesOfTeacher(int page, int teacherId) {
//        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
//        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);
//
//        var pageData = classRepository.getAllClassesOfTeacher(teacherId, pageable);
//
//        return PageResponse.<ClassLiteResponse>builder()
//                .currentPage(page)
//                .pageSize(pageData.getSize())
//                .totalPages(pageData.getTotalPages())
//                .totalElements(pageData.getTotalElements())
//                .data(pageData.getContent().stream().map(classMapper::toClassLiteResponse).toList())
//                .build();
//    }

    @Override
    public ClassOfTeacherResponse getAllClassesOfTeacher(int teacherId) {
        UserAccount account = userAccountRepository.findById(teacherId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var classesOfTeacher = classRepository.getAllClassesOfTeacher(teacherId);
        var classes = classesOfTeacher.stream()
                .map(classMapper::toClassLiteResponse)
                .toList();

        return new ClassOfTeacherResponse(
                account.getFullname(),
                classes
        );
    }

    // Get class detail
    @Override
    public ClassDetailLiteResponse getClassDetailLite(String slug) {
        var classDetail = classRepository.getClassDetailBySlug(slug).orElseThrow(
                () -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        return classMapper.toClassDetailLiteResponse(classDetail);
    }

    // Get class of student
    @PreAuthorize("hasRole('STUDENT')")
    @Override
    public List<ClassProgressResponse> getMyStudentClass() {
        UserAccount userAccount = authService.getUserAccountByJwtToken();
        List<Class> classes = classRepository.getMyStudentClasses(userAccount.getId());
        List<Integer> classIds = classes.stream().map(Class::getId).toList();
        Map<Integer, Integer> progressMap = countLessonOfClass(classIds);
        return classes.stream()
                .map(clazz -> classMapper.toClassProgressResponse(clazz, progressMap.get(clazz.getId())))
                .toList();
    }

    // Get class lesson detail
    @Override
    public ClassLessonResponse getClassLesson(String slug) {
//        UserAccount account = authService.getUserAccountByJwtToken();

        // Does this student have this class?
//        if (account.getRole().equalsIgnoreCase(Role.STUDENT.name())) {
//            enrollmentRepository.findByStudentIdAndClassFieldSlugAndStatusEqualsIgnoreCase(account.getId(), slug, StatusEnrollment.ACTIVE.name())
//                    .orElseThrow(() -> new AppException(ErrorCode.UNAUTHORIZED));
//        }
//
//        Class clazz = classRepository.findClassBySlug(slug).orElseThrow(
//                () -> new AppException(ErrorCode.CLASS_NOT_EXISTED)
//        );
//
//        // Does this teacher have this class?
//        if (account.getRole().equalsIgnoreCase(Role.TEACHER.name())) {
//            if (!Objects.equals(clazz.getTeacher().getId(), account.getId())) {
//                throw new AppException(ErrorCode.UNAUTHORIZED);
//            }
//        }

        Class clazz = authService.checkViewClassPermissions(slug);

        // Count section and content
        List<Integer> classLessonIds = clazz.getClassLessonConfigs().stream()
                .map(classLessonConfig -> classLessonConfig.getClassLesson().getId())
                .toList();

        Map<Integer, Integer> countSectionMap = countSectionOfClassLesson(classLessonIds);
//        Map<Integer, Integer> countContentMap = countContentOfClassLesson(classLessonIds);

        // Get lessons of class
        ClassLessonResponse classLessonResponse = classMapper.toClassLessonResponse(clazz, clazz.getClassLessonConfigs().size());
        List<ClassLessonBasicResponse> updatedLessons = classLessonResponse.getLessons().stream()
                .peek(l -> {
                    l.setNumberOfSection(countSectionMap.getOrDefault(l.getClassLessonId(), 0));
//                    l.setNumberOfContent(countContentMap.getOrDefault(l.getClassLessonId(), 0));
                }).toList();
        classLessonResponse.setLessons(updatedLessons);

        return classLessonResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public PageResponse<ClassAdminResponse> filterClass(ClassFilterRequest classFilterRequest, Integer page) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM);

        Specification<Class> spec = ClassSpecification.filter(classFilterRequest);
        var pageData = classRepository.findAll(spec, pageable);

        var userIds = Stream.concat(
                pageData.stream().map(Class::getCreatedBy),
                pageData.stream().map(Class::getUpdatedBy)
        ).distinct().toList();

        Map<Integer, String> userMap = userAccountService.getUserAccountMap(userIds);

        return PageResponse.<ClassAdminResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.stream()
                        .map(clazz -> classMapper
                                .toClassAdminResponse(clazz, userMap.get(clazz.getCreatedBy()), userMap.get(clazz.getUpdatedBy())))
                        .toList())
                .build();
    }

    private AdminClassResponse toAdminClassResponse(Class clazz) {
        var createdById = clazz.getCreatedBy();
        var updatedById = clazz.getUpdatedBy();
        var userMap = userAccountService.getUserAccountMap(List.of(createdById, updatedById));
        return classMapper.toAdminClassResponse(clazz, userMap.get(createdById), userMap.get(createdById));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminClassResponse getClass(String classSlug) {
        Class clazz = classRepository.findBySlug(classSlug)
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        return this.toAdminClassResponse(clazz);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminClassResponse addClass(AddClassRequest request) {
        Course course = courseRepository.findBySlug(request.getCourseSlug()).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_EXISTED)
        );

        if (classRepository.existsBySlug(request.getSlug())) {
            throw new AppException(ErrorCode.SLUG_EXISTED);
        }

        Class clazz = classMapper.toClass(request);
        clazz.setAvailableSlots(0);
        clazz.setStatus(StatusClass.UPCOMING.name());
        clazz.setCourse(course);
        classRepository.save(clazz);
        return this.toAdminClassResponse(clazz);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminClassResponse updateClass(UpdateClassRequest request) {
        Class clazz = classRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));

        if (classRepository.existsBySlug(request.getSlug())) {
            if (!request.getSlug().equalsIgnoreCase(clazz.getSlug())) {
                throw new AppException(ErrorCode.SLUG_EXISTED);
            }
        }

        int reducedSlots = clazz.getMaxStudents() - request.getMaxStudents();
        int availableSlots = clazz.getAvailableSlots();

        if (reducedSlots > 0 && reducedSlots > availableSlots) {
            throw new AppException(ErrorCode.MAX_STUDENTS_INVALID);
        }

        if (reducedSlots != 0) {
            clazz.setAvailableSlots(reducedSlots - availableSlots);
        }

        classMapper.updateClass(request, clazz);
        classRepository.save(clazz);

        return this.toAdminClassResponse(clazz);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean deleteClass(Integer classId) {
        Class clazz = classRepository.findById(classId)
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        if (enrollmentRepository.existsByClassFieldId(classId)) {
            throw new AppException(ErrorCode.CAN_NOT_DELETE);
        }
        classRepository.delete(clazz);
        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean openClass(String classSlug) {
        Class clazz = classRepository.findBySlug(classSlug)
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        if (!clazz.getStatus().equalsIgnoreCase(StatusClass.UPCOMING.name())) {
            throw new AppException(ErrorCode.CAN_NOT_OPEN);
        }
        clazz.setStatus(StatusClass.from(clazz.getStatus()).next().name());
        classRepository.save(clazz);
        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean closeClass(String classSlug) {
        Class clazz = classRepository.findBySlug(classSlug)
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        if (!clazz.getStatus().equalsIgnoreCase(StatusClass.ONGOING.name())) {
            throw new AppException(ErrorCode.CAN_NOT_CLOSE);
        }
        clazz.setStatus(StatusClass.from(clazz.getStatus()).next().name());
        classRepository.save(clazz);
        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean updateStatusClass(UpdateClassStatusRequest request) {
        Class clazz = classRepository.findBySlug(request.classSlug())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        //Check status
        StatusClass.from(request.status());
        clazz.setStatus(request.status());
        classRepository.save(clazz);
        return true;
    }

    // Get classes of teacher
    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public PageResponse<ClassProgressResponse> getMyTeacherClass(String status, Integer page) {
        UserAccount userAccount = authService.getUserAccountByJwtToken();

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM_BENTO, sort);

        Page<Class> pageData = classRepository.getMyTeacherClasses(userAccount.getId(), status, pageable);

        List<Integer> classIds = pageData.stream().map(Class::getId).toList();
        Map<Integer, Integer> progressMap = countLessonOfClass(classIds);

        return PageResponse.<ClassProgressResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.stream()
                        .map(clazz -> classMapper.toClassProgressResponse(clazz, progressMap.getOrDefault(clazz.getId(), 0)))
                        .toList())
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminClassInfoResponse getAdminClassInfo(String classSlug) {
        Class clazz = classRepository.findBySlug(classSlug)
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        return classMapper.toAdminClassInfoResponse(clazz);
    }

    // -- COUNT --
    // Count lesson Of classes
    private Map<Integer, Integer> countLessonOfClass(List<Integer> classIds) {
        return classRepository.countLessonByClasses(classIds)
                .stream()
                .collect(Collectors.toMap(
                        ClassLessonCountProjection::getClassId,
                        p -> p.getLessonCount().intValue()
                ));
    }

    // Count section of classLesson
    private Map<Integer, Integer> countSectionOfClassLesson(List<Integer> classIds) {
        return sectionRepository.countsByClassLessonId(classIds)
                .stream()
                .collect(Collectors.toMap(
                        SectionCountProjection::getClassLessonId,
                        p -> p.getNumberOfSection().intValue()
                ));
    }

    // Count section of classLesson
//    private Map<Integer, Integer> countContentOfClassLesson(List<Integer> classIds) {
//        return contentRepository.countByClassLessonId(classIds)
//                .stream()
//                .collect(Collectors.toMap(
//                        ContentCountProjection::getClassLessonId,
//                        p -> p.getNumberOfContent().intValue()
//                ));
//    }
}

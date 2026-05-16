package com.studyhub.studyhub_api.service.statistics.impl;

import com.studyhub.studyhub_api.dto.response.statistics.AttendanceStatisticsProject;
import com.studyhub.studyhub_api.dto.response.statistics.RevenueStatisticsProjection;
import com.studyhub.studyhub_api.dto.response.statistics.RevenueStatisticsResponse;
import com.studyhub.studyhub_api.dto.response.statistics.StatisticsBasicResponse;
import com.studyhub.studyhub_api.enums.Role;
import com.studyhub.studyhub_api.repository.*;
import com.studyhub.studyhub_api.service.statistics.StatisticsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class StatisticsServiceImpl implements StatisticsService {
    UserAccountRepository userAccountRepository;
    CourseRepository courseRepository;
    ClassRepository classRepository;
    AttendanceRepository attendanceRepository;
    InvoiceRepository invoiceRepository;

    @Override
    public StatisticsBasicResponse getBasicStatistics() {
        Long numberOfStudent = userAccountRepository.countByRole(Role.STUDENT.name());
        Long numberOfTeacher = userAccountRepository.countByRole(Role.TEACHER.name());
        Long numberOfCourses = courseRepository.countActiveCourses();
        Long numberOfClasses = classRepository.countOnGoingClass();

        LocalDate now = LocalDate.now();
        LocalDate firstDay =
                now.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate lastDay =
                now.with(TemporalAdjusters.lastDayOfMonth());
        List<AttendanceStatisticsProject> attendanceStatistics = attendanceRepository.getStatisticsAttendance(firstDay, lastDay);

//        AtomicReference<Long> numberOfPresent = new AtomicReference<>(0L);
//        AtomicReference<Long> numberOfAbsent = new AtomicReference<>(0L);

//        attendanceStatistics.forEach(
//                attendance -> {
//                    if(attendance.getStatus().equalsIgnoreCase("PRESENT")){
//                        numberOfPresent.set(attendance.getNumberOfAttendance());
//                    }
//                    if(attendance.getStatus().equalsIgnoreCase("ABSENT")){
//                        numberOfAbsent.set(attendance.getNumberOfAttendance());
//                    }
//                }
//        );

        Long numberOfPresent = 0L;
        Long numberOfAbsent = 0L;

        for (AttendanceStatisticsProject attendance : attendanceStatistics) {
            if (attendance.getStatus().equalsIgnoreCase("PRESENT")) {
                numberOfPresent = attendance.getNumberOfAttendance();
            }
            if (attendance.getStatus().equalsIgnoreCase("ABSENT")) {
                numberOfAbsent = attendance.getNumberOfAttendance();
            }
        }

        List<Integer> revenueYears = invoiceRepository.getDistinctYear();

        return new StatisticsBasicResponse(numberOfStudent, numberOfTeacher, numberOfCourses, numberOfClasses, numberOfPresent, numberOfAbsent, revenueYears);
    }

    @Override
    public List<RevenueStatisticsResponse> getRevenueStatistics(Integer year) {
        Map<Integer, BigDecimal> statisticsMap = new HashMap<>();
        for (int i = 1; i <= 12; i++) {
            statisticsMap.put(i, BigDecimal.ZERO);
        }
        List<RevenueStatisticsProjection> revenueProjections = invoiceRepository.getRevenueMonth(year);
        revenueProjections.forEach(revenueStatistics -> {
            BigDecimal revenueValue = statisticsMap.get(revenueStatistics.getRevenueMonth());
            if (revenueStatistics.getStatus().equalsIgnoreCase("PAID")) {
                revenueValue = revenueValue.add(revenueStatistics.getSumRevenue());
            }
            if (revenueStatistics.getStatus().equalsIgnoreCase("REFUNDED")) {
                revenueValue = revenueValue.subtract(revenueStatistics.getSumRevenue());
            }
            statisticsMap.put(revenueStatistics.getRevenueMonth(), revenueValue);
        });

        return statisticsMap.entrySet()
                .stream()
                .map(entry -> new RevenueStatisticsResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }
}

package com.studyhub.studyhub_api.util.job;

import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import com.studyhub.studyhub_api.service.mail.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SchedulerTask {
    // THÊM final ở đây để Lombok tự động tạo Constructor inject MailService vào
    private final MailService mailService;
    private final InvoiceService invoiceService;

    /**
     * TASK 1: Chạy ngay lập tức sau khi ứng dụng khởi động thành công và KHÔNG lặp lại nữa.
     * Sử dụng @EventListener lắng nghe sự kiện ApplicationReadyEvent là giải pháp an toàn nhất.
     */
//    @EventListener(ApplicationReadyEvent.class)
//    public void runTestTaskOnce() {
//        log.info("Starting test email task...");
//        mailService.testSendMail();
//        log.info("Sent email test successfully!");
//    }

    /**
     * TASK 2: Chạy định kỳ vào đúng 08:00:00 sáng mỗi ngày.
     * Biểu thức Cron: "giây phút giờ ngày tháng thứ"
     * zone = "Asia/Ho_Chi_Minh": Đảm bảo chạy đúng múi giờ Việt Nam bất kể deploy ở server quốc tế.
     */
    @Scheduled(cron = "0 0 8 * * *", zone = "Asia/Ho_Chi_Minh")
    public void runDailyFeeDeadlineTask() {
        invoiceService.overDueInvoice();
        log.info("Starting daily fee deadline email task...");
        mailService.sendFeeDeadlineMail();
        log.info("Sent daily deadline email successfully!");
    }
}

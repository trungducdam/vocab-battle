# Pororo Vocab Battle

![Project status](https://img.shields.io/badge/status-Frontend%20Complete-34d399)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111827)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-7952B3?logo=bootstrap&logoColor=white)

<p align="center">
  <img src="assets/images/pororo.jpg" width="120" alt="Pororo Vocab Battle">
</p>

**Pororo Vocab Battle** là website học từ vựng tiếng Anh theo hình thức thi đấu 1v1. Người chơi có thể lựa chọn kho từ, số lượng câu hỏi, độ khó bot và loại phòng trước khi bước vào trận đấu mô phỏng với hệ thống HP, điểm số và bộ đếm thời gian.

Ngoài thi đấu, website có chế độ **Luyện tập theo bậc CEFR và chủ đề IELTS**, cho phép người học ôn toàn bộ từ của A1-C2 hoặc chọn một trong 26 chủ đề Band 7.0+ trong phiên không giới hạn thời gian.

Phiên bản hiện tại đã hoàn thành phần **frontend responsive** bằng HTML, CSS, JavaScript thuần và Bootstrap 5. Sau này sẽ tiếp tục phát triển thành ứng dụng realtime với ASP.NET Core, SQL Server và SignalR.

> **Trạng thái:** Frontend hoàn chỉnh · Backend đang trong kế hoạch triển khai

## Mục lục

- [Tính năng nổi bật](#tính-năng-nổi-bật)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cách chạy dự án](#cách-chạy-dự-án)
- [Tài khoản và dữ liệu demo](#tài-khoản-và-dữ-liệu-demo)
- [Luồng trải nghiệm](#luồng-trải-nghiệm)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Giới hạn của phiên bản frontend](#giới-hạn-của-phiên-bản-frontend)

## Tính năng nổi bật

### Thi đấu từ vựng

- Tạo trận **public** hoặc phòng **private**.
- Phản hồi đúng/sai bằng hiệu ứng ánh sáng, xung kích và pháo giấy; bộ đếm chuỗi có hiệu ứng tăng cấp ở các mốc liên tiếp.
- Ba chế độ: **10 câu, 50 câu và 100 câu**.
- Ba độ khó bot: **Easy, Normal và Hard**, với độ chính xác, tốc độ trả lời và sát thương khác nhau; độ khó của từ theo CEFR cũng ảnh hưởng đến bot.
- HP, sát thương và điểm số được điều chỉnh theo từng chế độ.
- Chỉ câu trả lời đúng mới gây sát thương lên đối thủ; trả lời sai không tự trừ HP.
- Trận đấu luôn chạy đủ số câu đã chọn; HP chỉ được so sánh khi kết thúc, sau đó dùng điểm và số câu đúng để phá hòa.
- Hai người chơi được thiết kế để nhận cùng câu hỏi theo cùng thứ tự.
- Màn hình trận đấu có timer, thanh HP, điểm số, tiến trình, animation bot chọn A/B/C/D và sát thương từ bot.
- Hỗ trợ trả lời bằng chuột hoặc phím `A`, `B`, `C`, `D`.

### Kho từ vựng chung

- 772 mục từ chuẩn hóa từ cấp độ **A1 đến C2**, gồm 200 mục A1-B2 và 572 mục C1-C2 không trùng từ.
- Dữ liệu IELTS vẫn giữ đủ 1.040 lượt gắn từ vào 26 chủ đề; một từ dùng chung cho nhiều chủ đề chỉ xuất hiện một lần trong kho chung.
- Bộ lọc riêng cho A1, A2, B1, B2, C1 và C2.
- Tìm kiếm theo từ, nghĩa hoặc câu ví dụ.
- Nhấn vào từ để xem IPA UK/US từ nguồn mở và mở liên kết kiểm chứng trên Cambridge Dictionary.
- Mỗi mục có nghĩa tiếng Việt, nhãn CEFR, loại mục và chủ đề; nhóm A1-B2 có thêm câu ví dụ.
- Với mục có ví dụ, nhấn vào từ để mở hoặc đóng phần nội dung này.
- Mục riêng chứa **100 idioms** kèm nghĩa và ví dụ ứng dụng.

### Kho từ vựng riêng

- Mỗi User có một kho từ riêng trên trình duyệt.
- Thêm, sửa và xóa từ thủ công.
- Nhập dữ liệu từ file **DOCX** hoặc **PDF**.
- Tự động loại bỏ những từ trùng lặp khi nhập.
- Có thể chọn kho riêng khi tạo trận với bạn bè.

### Luyện tập theo bậc CEFR và chủ đề IELTS

- Chọn một trong sáu bậc A1, A2, B1, B2, C1 hoặc C2.
- Luyện toàn bộ từ đang có trong bậc đã chọn; dữ liệu chuẩn hóa hiện có 487 mục C1 và 85 mục C2.
- Chọn riêng một trong **26 chủ đề IELTS**, mỗi chủ đề có 40 từ hoặc cụm từ.
- Bốn lựa chọn luyện: **Hỗn hợp**, nhập từ bằng bàn phím, nghe và điền, cùng bài ghép từ với nghĩa theo nhóm 5 cặp.
- Dạng nhập từ hiển thị nghĩa tiếng Việt và số dấu gạch dưới tương ứng với độ dài của đáp án tiếng Anh.
- Dạng nghe dùng `SpeechSynthesis API`, có nút phát lại và chấm đáp án không phân biệt chữ hoa/thường.
- Từ/cụm từ tự điều chỉnh cỡ chữ theo độ dài; đáp án đúng và sai có hiệu ứng phản hồi riêng, đồng thời tôn trọng cài đặt giảm chuyển động của thiết bị.
- Sau khi trả lời, thẻ phản hồi hiển thị IPA UK/US và liên kết tra cứu Cambridge; phiên âm không xuất hiện trong trận đấu.
- Mỗi chủ đề có đúng 36 từ đơn và 4 cụm học thuật, kèm nghĩa tiếng Việt lấy từ tài liệu đã kiểm chứng.
- Mỗi từ xuất hiện đúng một lần trong phiên và câu hỏi được trộn thứ tự.
- Không giới hạn thời gian, phù hợp để học và ghi nhớ thay vì thi đấu.
- Phản hồi ngay sau mỗi câu, luôn kèm nghĩa đúng và hiển thị câu ví dụ khi dữ liệu nguồn có cung cấp.
- Theo dõi số câu đúng, sai, độ chính xác và tiến độ của phiên.
- Tự động lưu bộ từ, thứ tự câu, vị trí hiện tại, số câu đúng/sai, danh sách trả lời sai và thời điểm cập nhật.
- Có thể quay lại bằng thẻ **Continue [tên bộ] — x/y** hoặc chủ động xóa phiên đang dở.
- Lưu điểm tốt nhất riêng theo từng bộ và dạng bài trên trình duyệt, đồng thời liệt kê các từ cần ôn lại.

### Tài khoản và phân quyền

- Hai vai trò giao diện: **Admin** và **User**.
- Admin có thể quản lý kho từ chung và idioms.
- User chỉ xem kho chung nhưng có toàn quyền với kho riêng của mình.
- Luồng đăng ký bằng email và OTP demo.
- Giao diện đăng nhập Google và Facebook mô phỏng.
- Hỗ trợ avatar tài khoản xã hội trong hồ sơ.
- Tài khoản mới có Elo, số trận và tỷ lệ thắng mặc định bằng `0`.

### Chuỗi ngày học và lịch hoạt động

- Tự động ghi nhận hoạt động khi hoàn thành câu luyện tập hoặc kết thúc trận đấu.
- Tính **chuỗi ngày hiện tại**, **chuỗi dài nhất** và tổng số ngày đã học.
- Lịch heatmap 365 ngày theo phong cách GitHub với năm mức độ hoạt động.
- Di chuột vào từng ô để xem ngày và số lượt học tương ứng.
- Toàn bộ lịch sử hoạt động được lưu bằng `localStorage` trong phiên bản frontend demo.

### Giao diện và trải nghiệm

- Responsive trên desktop, tablet và điện thoại.
- Thiết kế dark theme với phong cách game/arena.
- Nền Aurora gradient tím-xanh chuyển động chậm, tối ưu riêng cho thiết bị di động.
- Navbar, modal, toast, pagination và trạng thái rỗng.
- Màn hình Pororo loading khi mở hoặc refresh trang.
- Hiệu ứng chuyển trang cho đăng nhập, tạo phòng và vào trận.
- Tôn trọng thiết lập `prefers-reduced-motion` của người dùng.
- Bảng xếp hạng demo gồm năm bot.

## Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| HTML5 | Cấu trúc các trang |
| CSS3 | Dark theme, responsive và animation |
| JavaScript ES6+ | State, tương tác, gameplay và phân quyền demo |
| Bootstrap 5 | Grid, modal, navbar và component giao diện |
| Bootstrap Icons | Hệ thống icon |
| LocalStorage | Lưu tài khoản, kho từ, điểm luyện, phiên đang dở và lịch hoạt động học tập |
| SessionStorage | Lưu cấu hình và thứ tự câu hỏi của trận demo hiện tại |
| Mammoth.js | Đọc nội dung file DOCX |
| PDF.js | Trích xuất văn bản từ file PDF |

## Cách chạy dự án

### Cách 1: VS Code Live Server

1. Tải hoặc clone repository về máy.
2. Mở thư mục dự án bằng Visual Studio Code.
3. Cài extension **Live Server**.
4. Nhấp chuột phải vào `index.html`.
5. Chọn **Open with Live Server**.

### Cách 2: Mở trực tiếp

Mở file `index.html` bằng trình duyệt. Một số trình duyệt có thể hạn chế thao tác với file local, vì vậy Live Server vẫn là lựa chọn khuyến nghị.

Bootstrap, Bootstrap Icons, Google Fonts, Mammoth.js và PDF.js được tải qua CDN. Thiết bị cần có kết nối Internet để giao diện và chức năng tải file hoạt động đầy đủ.

## Tài khoản và dữ liệu demo

### Admin

```text
Email: admin@pororo.vn
Password: Admin@123
```

### User

Tạo tài khoản mới tại trang đăng ký hoặc sử dụng luồng Google/Facebook demo.

```text
OTP demo: 123456
```

> Không sử dụng tài khoản, mật khẩu hoặc OTP demo này trong môi trường production.

## Luồng trải nghiệm

1. Đăng ký hoặc đăng nhập vào hệ thống demo.
2. Mở **Kho từ vựng** để tìm kiếm, lọc CEFR hoặc xem idioms.
3. Nhấn vào từng từ để xem phiên âm, liên kết Cambridge và câu ví dụ.
4. Mở **Luyện tập**, chọn một bậc CEFR hoặc một trong 26 chủ đề IELTS để ôn toàn bộ bộ từ đó.
5. Nếu thoát giữa chừng, dùng thẻ **Continue** để trở lại đúng vị trí và thứ tự câu trước đó.
6. User có thể tạo kho riêng bằng cách thêm từ hoặc tải DOCX/PDF.
7. Trở về trang chủ và chọn 10, 50 hoặc 100 câu, kho từ và độ khó bot.
8. Tạo trận public hoặc phòng private.
9. Bắt đầu trận đấu mô phỏng, quan sát bot chọn đáp án và trả lời bằng chuột hoặc bàn phím.
10. Hoàn thành đủ số câu để nhận kết quả dựa trên HP cuối trận.
11. Xem chuỗi ngày học, lịch heatmap 365 ngày và thành tích trong hồ sơ.

## Cấu trúc thư mục

```text
vocab-battle-frontend/
├── index.html                  # Trang chủ và thiết lập trận đấu
├── login.html                  # Đăng nhập
├── register.html               # Đăng ký và OTP
├── profile.html                # Hồ sơ người chơi
├── vocabulary.html             # Kho chung, idioms và kho riêng
├── practice.html               # Luyện theo bậc CEFR và chủ đề IELTS
├── room.html                   # Tạo/tham gia phòng private
├── battle.html                 # Màn hình trận đấu mô phỏng
├── leaderboard.html            # Bảng xếp hạng
├── README.md
└── assets/
    ├── images/
    │   └── pororo.jpg
    ├── css/
    │   └── main.css
    └── js/
        ├── app.js              # Layout, chuyển trang và lịch sử hoạt động
        ├── auth.js             # Authentication demo
        ├── profile.js          # Hồ sơ, chuỗi ngày học và heatmap 365 ngày
        ├── home.js             # Thiết lập trận từ trang chủ
        ├── battle-config.js    # Cấu hình số câu, HP và độ khó bot
        ├── room.js             # Logic phòng chờ
        ├── battle.js           # Gameplay mô phỏng
        ├── practice.js         # Câu hỏi theo bậc/chủ đề và kết quả luyện
        ├── vocabulary.js       # Giao diện và CRUD từ vựng
        ├── word-bank.js        # Kho chung/kho riêng
        ├── pronunciation-data.js # IPA UK/US rút gọn cho dữ liệu của web
        ├── vocabulary-data.js  # 200 từ nền A1-B2
        ├── ielts-band7-data.js # 1.040 lượt chủ đề, chuẩn hóa thành 572 mục C1-C2
        ├── vocabulary-examples.js
        └── idiom-data.js       # 100 idioms
```


## Giới hạn của phiên bản frontend

Đây là phiên bản frontend độc lập nên một số chức năng đang được mô phỏng:

- Dữ liệu được lưu trong `localStorage`, không đồng bộ giữa các thiết bị.
- Google/Facebook chưa kết nối OAuth thật.
- OTP chưa được gửi qua email thật.
- Role Admin/User chưa được xác thực bởi máy chủ.
- Phòng public/private chưa kết nối hai thiết bị khác nhau.
- Trận đấu hiện chạy với bot mô phỏng theo ba độ khó thay vì SignalR realtime.
- PDF scan chỉ chứa hình ảnh chưa hỗ trợ OCR.

Không lưu token production, role hoặc đáp án đúng trong `localStorage`. Các dữ liệu quan trọng phải được backend kiểm tra và quyết định.


## Định hướng phát triển tiếp theo

- [x] Hoàn thiện giao diện responsive.
- [x] Hoàn thiện kho từ A1-C2 và idioms.
- [x] Hoàn thiện gameplay frontend mô phỏng.
- [x] Hoàn thiện phân quyền Admin/User ở mức giao diện.
- [ ] Xây dựng ASP.NET Core API.
- [ ] Kết nối SQL Server và Identity.
- [ ] Gửi OTP email thật.
- [ ] Kết nối Google/Facebook OAuth.
- [ ] Xây dựng matchmaking và SignalR BattleHub.
- [ ] Viết automated tests và triển khai production.

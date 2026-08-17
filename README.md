# Pororo Vocab Battle

![Project status](https://img.shields.io/badge/status-Frontend%20Complete-34d399)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111827)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-7952B3?logo=bootstrap&logoColor=white)

<p align="center">
  <img src="assets/images/pororo.jpg" width="120" alt="Pororo Vocab Battle">
</p>

**Pororo Vocab Battle** là website học từ vựng tiếng Anh theo hình thức thi đấu 1v1. Người chơi có thể lựa chọn kho từ, số lượng câu hỏi và loại phòng trước khi bước vào trận đấu mô phỏng với hệ thống HP, điểm số và bộ đếm thời gian.

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
- Ba chế độ: **10 câu, 50 câu và 100 câu**.
- HP, sát thương và điểm số được điều chỉnh theo từng chế độ.
- Hai người chơi được thiết kế để nhận cùng câu hỏi theo cùng thứ tự.
- Màn hình trận đấu có timer, thanh HP, điểm số, tiến trình và kết quả.
- Hỗ trợ trả lời bằng chuột hoặc phím `A`, `B`, `C`, `D`.

### Kho từ vựng chung

- 1.240 mục từ từ cấp độ **A1 đến C2**, gồm 200 mục A1-B2 và 1.040 mục IELTS C1-C2 theo chủ đề.
- Bộ lọc riêng cho A1, A2, B1, B2, C1 và C2.
- Tìm kiếm theo từ, nghĩa hoặc câu ví dụ.
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
- Luyện toàn bộ từ đang có trong bậc đã chọn; dữ liệu nâng cao gồm 780 mục C1 và 260 mục C2.
- Chọn riêng một trong **26 chủ đề IELTS**, mỗi chủ đề có 40 từ hoặc cụm từ.
- Đáp án nhiễu ưu tiên nghĩa cùng loại từ, cùng chủ đề và có độ dài gần nhau để tăng độ khó.
- Từ/cụm từ tự điều chỉnh cỡ chữ theo độ dài; đáp án đúng và sai có hiệu ứng phản hồi riêng, đồng thời tôn trọng cài đặt giảm chuyển động của thiết bị.
- Mỗi chủ đề có đúng 36 từ đơn và 4 cụm học thuật, kèm nghĩa tiếng Việt lấy từ tài liệu đã kiểm chứng.
- Mỗi từ xuất hiện đúng một lần trong phiên và câu hỏi được trộn thứ tự.
- Không giới hạn thời gian, phù hợp để học và ghi nhớ thay vì thi đấu.
- Phản hồi ngay sau mỗi câu, luôn kèm nghĩa đúng và hiển thị câu ví dụ khi dữ liệu nguồn có cung cấp.
- Theo dõi số câu đúng, sai, độ chính xác và tiến độ của phiên.
- Lưu điểm tốt nhất theo từng bậc trên trình duyệt và liệt kê các từ cần ôn lại.

### Tài khoản và phân quyền

- Hai vai trò giao diện: **Admin** và **User**.
- Admin có thể quản lý kho từ chung và idioms.
- User chỉ xem kho chung nhưng có toàn quyền với kho riêng của mình.
- Luồng đăng ký bằng email và OTP demo.
- Giao diện đăng nhập Google và Facebook mô phỏng.
- Hỗ trợ avatar tài khoản xã hội trong hồ sơ.
- Tài khoản mới có Elo, số trận và tỷ lệ thắng mặc định bằng `0`.

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
| LocalStorage | Lưu tài khoản, kho từ và cấu hình trận demo |
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
3. Nhấn vào từng từ để xem câu ví dụ.
4. Mở **Luyện tập**, chọn một bậc CEFR hoặc một trong 26 chủ đề IELTS để ôn toàn bộ bộ từ đó.
5. User có thể tạo kho riêng bằng cách thêm từ hoặc tải DOCX/PDF.
6. Trở về trang chủ và chọn 10, 50 hoặc 100 câu.
7. Chọn kho chung hoặc kho riêng.
8. Tạo trận public hoặc phòng private.
9. Bắt đầu trận đấu mô phỏng và trả lời bằng chuột hoặc bàn phím.
10. Xem hồ sơ và bảng xếp hạng sau trận.

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
        ├── app.js              # Layout, toast và chuyển trang
        ├── auth.js             # Authentication demo
        ├── home.js             # Thiết lập trận từ trang chủ
        ├── battle-config.js    # Cấu hình 10/50/100 câu
        ├── room.js             # Logic phòng chờ
        ├── battle.js           # Gameplay mô phỏng
        ├── practice.js         # Câu hỏi theo bậc/chủ đề và kết quả luyện
        ├── vocabulary.js       # Giao diện và CRUD từ vựng
        ├── word-bank.js        # Kho chung/kho riêng
        ├── vocabulary-data.js  # 200 từ nền A1-B2
        ├── ielts-band7-data.js # 1.040 mục C1-C2 thuộc 26 chủ đề IELTS
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
- Trận đấu hiện chạy với bot thay vì SignalR realtime.
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

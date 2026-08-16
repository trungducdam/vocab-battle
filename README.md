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

- 250 từ vựng duy nhất từ cấp độ **A1 đến C1**.
- Bộ lọc riêng cho A1, A2, B1, B2 và C1.
- Tìm kiếm theo từ, nghĩa hoặc câu ví dụ.
- Mỗi từ có nghĩa tiếng Việt, loại từ và câu ví dụ.
- Nhấn vào một từ để mở hoặc đóng phần ví dụ.
- Mục riêng chứa **100 idioms** kèm nghĩa và ví dụ ứng dụng.

### Kho từ vựng riêng

- Mỗi User có một kho từ riêng trên trình duyệt.
- Thêm, sửa và xóa từ thủ công.
- Nhập dữ liệu từ file **DOCX** hoặc **PDF**.
- Tự động loại bỏ những từ trùng lặp khi nhập.
- Có thể chọn kho riêng khi tạo trận với bạn bè.

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
4. User có thể tạo kho riêng bằng cách thêm từ hoặc tải DOCX/PDF.
5. Trở về trang chủ và chọn 10, 50 hoặc 100 câu.
6. Chọn kho chung hoặc kho riêng.
7. Tạo trận public hoặc phòng private.
8. Bắt đầu trận đấu mô phỏng và trả lời bằng chuột hoặc bàn phím.
9. Xem hồ sơ và bảng xếp hạng sau trận.

## Cấu trúc thư mục

```text
vocab-battle-frontend/
├── index.html                  # Trang chủ và thiết lập trận đấu
├── login.html                  # Đăng nhập
├── register.html               # Đăng ký và OTP
├── profile.html                # Hồ sơ người chơi
├── vocabulary.html             # Kho chung, idioms và kho riêng
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
        ├── vocabulary.js       # Giao diện và CRUD từ vựng
        ├── word-bank.js        # Kho chung/kho riêng
        ├── vocabulary-data.js  # 250 từ A1-C1
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
- [x] Hoàn thiện kho từ A1-C1 và idioms.
- [x] Hoàn thiện gameplay frontend mô phỏng.
- [x] Hoàn thiện phân quyền Admin/User ở mức giao diện.
- [ ] Xây dựng ASP.NET Core API.
- [ ] Kết nối SQL Server và Identity.
- [ ] Gửi OTP email thật.
- [ ] Kết nối Google/Facebook OAuth.
- [ ] Xây dựng matchmaking và SignalR BattleHub.
- [ ] Viết automated tests và triển khai production.

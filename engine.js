/* engine.js — toàn bộ phần tính toán (trước đây là các file .gs). Chạy hoàn toàn trên trình duyệt. */
"use strict";

// ================= Data.gs =================
// Danh sách vị trí địa lý
const DANH_SACH_VI_TRI = {
  // MIỀN BẮC (Xếp từ Đông sang Tây)
  "Quảng Ninh, Việt Nam": { gmt: 7, mins: 9 },
  "Lạng Sơn, Việt Nam": { gmt: 7, mins: 6 },
  "Hải Phòng, Việt Nam": { gmt: 7, mins: 6 },
  "Cao Bằng, Việt Nam": { gmt: 7, mins: 5 },
  "Hải Dương, Việt Nam": { gmt: 7, mins: 5 },
  "Nam Định, Việt Nam": { gmt: 7, mins: 5 },
  "Thái Bình, Việt Nam": { gmt: 7, mins: 5 },
  "Bắc Giang, Việt Nam": { gmt: 7, mins: 5 },
  "Bắc Ninh, Việt Nam": { gmt: 7, mins: 4 },
  "Hà Nam, Việt Nam": { gmt: 7, mins: 4 },
  "Hưng Yên, Việt Nam": { gmt: 7, mins: 4 },
  "Hà Nội, Việt Nam": { gmt: 7, mins: 3 },
  "Bắc Kạn, Việt Nam": { gmt: 7, mins: 3 },
  "Thái Nguyên, Việt Nam": { gmt: 7, mins: 3 },
  "Ninh Bình, Việt Nam": { gmt: 7, mins: 3 },
  "Vĩnh Phúc, Việt Nam": { gmt: 7, mins: 2 },
  "Tuyên Quang, Việt Nam": { gmt: 7, mins: 1 },
  "Phú Thọ, Việt Nam": { gmt: 7, mins: 1 },
  "Hòa Bình, Việt Nam": { gmt: 7, mins: 1 },
  "Yên Bái, Việt Nam": { gmt: 7, mins: -1 },
  "Hà Giang, Việt Nam": { gmt: 7, mins: -1 },
  "Sơn La, Việt Nam": { gmt: 7, mins: -4 },
  "Lào Cai, Việt Nam": { gmt: 7, mins: -4 },
  "Lai Châu, Việt Nam": { gmt: 7, mins: -7 },
  "Điện Biên, Việt Nam": { gmt: 7, mins: -8 },
  // MIỀN TRUNG & TÂY NGUYÊN (Xếp từ Đông sang Tây)
  "Bình Định, Việt Nam": { gmt: 7, mins: 17 },
  "Phú Yên, Việt Nam": { gmt: 7, mins: 17 },
  "Khánh Hòa, Việt Nam": { gmt: 7, mins: 17 },
  "Ninh Thuận, Việt Nam": { gmt: 7, mins: 16 },
  "Quảng Ngãi, Việt Nam": { gmt: 7, mins: 15 },
  "Đà Nẵng, Việt Nam": { gmt: 7, mins: 13 },
  "Quảng Nam, Việt Nam": { gmt: 7, mins: 13 },
  "Bình Thuận, Việt Nam": { gmt: 7, mins: 13 },
  "Lâm Đồng, Việt Nam": { gmt: 7, mins: 13 },
  "Kon Tum, Việt Nam": { gmt: 7, mins: 12 },
  "Gia Lai, Việt Nam": { gmt: 7, mins: 12 },
  "Đắk Lắk, Việt Nam": { gmt: 7, mins: 12 },
  "Thừa Thiên Huế, Việt Nam": { gmt: 7, mins: 10 },
  "Đắk Nông, Việt Nam": { gmt: 7, mins: 9 },
  "Quảng Trị, Việt Nam": { gmt: 7, mins: 9 },
  "Quảng Bình, Việt Nam": { gmt: 7, mins: 6 },
  "Thanh Hóa, Việt Nam": { gmt: 7, mins: 3 },
  "Hà Tĩnh, Việt Nam": { gmt: 7, mins: 3 },
  "Nghệ An, Việt Nam": { gmt: 7, mins: 2 },
  // MIỀN NAM (Xếp từ Đông sang Tây)
  "Bà Rịa - Vũng Tàu, Việt Nam": { gmt: 7, mins: 9 },
  "Đồng Nai, Việt Nam": { gmt: 7, mins: 8 },
  "Bình Phước, Việt Nam": { gmt: 7, mins: 7 },
  "TP. Hồ Chí Minh, Việt Nam": { gmt: 7, mins: 7 },
  "Bình Dương, Việt Nam": { gmt: 7, mins: 6 },
  "Long An, Việt Nam": { gmt: 7, mins: 6 },
  "Bến Tre, Việt Nam": { gmt: 7, mins: 6 },
  "Tiền Giang, Việt Nam": { gmt: 7, mins: 5 },
  "Trà Vinh, Việt Nam": { gmt: 7, mins: 5 },
  "Tây Ninh, Việt Nam": { gmt: 7, mins: 4 },
  "Vĩnh Long, Việt Nam": { gmt: 7, mins: 4 },
  "Sóc Trăng, Việt Nam": { gmt: 7, mins: 4 },
  "Đồng Tháp, Việt Nam": { gmt: 7, mins: 3 },
  "Bạc Liêu, Việt Nam": { gmt: 7, mins: 3 },
  "Cần Thơ, Việt Nam": { gmt: 7, mins: 2 },
  "Hậu Giang, Việt Nam": { gmt: 7, mins: 2 },
  "An Giang, Việt Nam": { gmt: 7, mins: 0 },
  "Cà Mau, Việt Nam": { gmt: 7, mins: 0 },
  "Kiên Giang, Việt Nam": { gmt: 7, mins: -2 }
}

// Thiên Can và Địa Chi
const CANS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHIS = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

const MA_TRAN_TONG_HOP_NGU_HANH = {
  "Kim": {
    thuocTinh: {
      tieuDe: "Mệnh KIM – \"Nghĩa\" (Cứng cỏi, Độc lập)",
      tongQuan: "Người mệnh Kim mang trường khí của kim loại: bền bỉ, sắc bén và có kỷ luật thép.",
      uu: "Quyết đoán, tập trung cao độ, đáng tin cậy.",
      nhuoc: "Cứng nhắc, bảo thủ và có xu hướng kiểm soát mạnh.",
      nhanDien: "Đề cao sự minh bạch, rõ ràng, tác phong nhanh gọn."
    },
    ngheNghiep: {
      dacTinh: "Tính kỷ luật, chính xác, sắc bén, cấu trúc hệ thống cứng.",
      viTriCongViec: [
        { nganh: "Công nghệ thông tin (IT phần cứng)", job: ["Kỹ sư phần cứng", "Kỹ sư hệ thống mạng", "Chuyên gia hạ tầng dữ liệu (Data Infrastructure)", "Kỹ sư bán dẫn/Vi mạch"] },
        { nganh: "Tài chính & Tiền tệ", job: ["Chuyên viên phân tích tài chính", "Ngân hàng phòng kiểm soát rủi ro", "Kế toán trưởng", "Chuyên gia định phí bảo hiểm (Actuary)", "Kiểm toán viên (Auditor)"] },
        { nganh: "Cơ khí & Chế tạo", job: ["Kỹ sư chế tạo máy", "Kỹ sư công nghệ ô tô", "Thợ kim hoàn", "Chuyên viên vận hành máy CNC", "Kỹ sư hàng không vũ trụ"] },
        { nganh: "Y tế & Pháp luật", job: ["Bác sĩ phẫu thuật / ngoại khoa", "Nha sĩ", "Luật sư tranh tụng", "Thẩm phán", "Kiểm sát viên"] },
        { nganh: "Quản lý & Giám sát", job: ["Quản lý dự án (PM)", "Chuyên viên kiểm định chất lượng (QA/QC)", "Sĩ quan quân đội/công an", "Giám sát kỹ thuật"] }
      ]
    },
    nhatChu: {
      "Canh": {
        tinhChat: "Dương",
        hinhTuong: "Quặng sắt thép thô sơ, kiếm sắc bén, kim loại cứng.",
        tinhCachUuDiem: "Khẳng khái, quyết đoán, dũng cảm và có tinh thần hiệp nghĩa mạnh mẽ. Thẳng thắn, ghét sự giả dối, tiến lên phía trước không lùi bước.",
        tinhCachNhuocDiem: "Quá cứng nhắc, độc đoán, dễ gây tổn thương cho người khác bằng lời nói bộc trực. Hiếu thắng và đôi khi hành động liều lĩnh.",
        ngheNghiep: "Quân đội, công an, cơ khí, thể thao chuyên nghiệp, phẫu thuật viên, kiểm toán.",
        loiKhuyenCaiVan: "Cần mài giũa góc cạnh của bản thân, học cách dùng nhu thắng cương và suy nghĩ thấu đáo đến cảm xúc của mọi người quanh mình.",
        bienTheChi: {
          "Tý": { napAm: "Bích Thượng Thổ", tuongTac: "Thiên Can sinh Địa Chi (Kim sinh Thủy).", luanGiai: "Thông minh, có tài năng hùng biện nhưng dễ cô độc trong tư duy. Bạn đời tài hoa, hướng nội, cần thấu hiểu nhau.", luanGiaiNam: "Thông minh, hùng biện tốt nhưng dễ cô độc. Người vợ tài hoa, hướng nội, thầm lặng chăm sóc gia đình, cần bạn chia sẻ nhiều hơn.", luanGiaiNu: "Sắc sảo, tài năng phát tiết ra ngoài. Bản mệnh sinh xuất cho cung chồng nên vất vả lo toan, bạn đời hướng nội, ít nói nhưng thấu hiểu." },
          "Dần": { napAm: "Tùng Bách Mộc", tuongTac: "Thiên Can khắc Địa Chi (Kim khắc Mộc).", luanGiai: "Năng lực hành động mạnh mẽ, giỏi kiếm tiền và có máu liều. Bạn đời có cá tính, độc lập tài chính, vợ chồng sòng phẳng.", luanGiaiNam: "Năng lực mạnh, giỏi kiếm tiền và có máu liều. Người vợ có cá tính, độc lập, vợ chồng sòng phẳng về tài chính, cần bớt tranh cãi vặt.", luanGiaiNu: "Quyết đoán, tự lập từ sớm. Bạn đời là người tháo vát, có sự nghiệp riêng, hôn nhân cần sự nhường nhịn để tránh xung đột quyền lực." },
          "Thìn": { napAm: "Trường Lưu Thủy", tuongTac: "Địa Chi sinh Thiên Can (Thổ sinh Kim).", luanGiai: "Thần mến mộ Quý nhân, bản mệnh vững vàng, tai qua nạn khỏi. Bạn đời có học thức, gia thế tốt, nâng đỡ sự nghiệp.", luanGiaiNam: "Tọa Quý nhân, bản mệnh vững vàng. Người vợ có học thức hoặc gia thế tốt, mang lại sự nâng đỡ và hậu thuẫn lớn cho sự nghiệp của chồng.", luanGiaiNu: "Khẳng khái, có số hưởng phúc. Người chồng là người đĩnh đạc, có trách nhiệm, luôn che chở và mang lại vinh hiển cho gia đình vợ." },
          "Ngọ": { napAm: "Lộ Bàng Thổ", tuongTac: "Địa Chi khắc Thiên Can (Hỏa khắc Kim).", luanGiai: "Tôi luyện trong áp lực nên ý chí kiên cường, thành công muộn. Bạn đời chính trực, nghiêm túc, gia đình nề nếp.", luanGiaiNam: "Tôi luyện trong áp lực nên ý chí kiên cường. Người vợ chính trực, nghiêm túc, quản lý việc nhà nề nếp, giúp chồng giữ gìn gia phong.", luanGiaiNu: "Mạnh mẽ, dám nghĩ dám làm. Bạn đời là người mẫu mực, coi trọng kỷ luật, hôn nhân có phần nghiêm túc nhưng vô cùng bền vững." },
          "Thân": { napAm: "Thạch Lựu Mộc", tuongTac: "Can Chi đồng hành (Kim - Kim).", luanGiai: "Cực kỳ can trường, tự lập tự cường, không ngại gian khổ. Bạn đời mạnh mẽ, đôi bên cần hạ cái tôi để tránh đổ vỡ.", luanGiaiNam: "Tự lập tự cường, không ngại gian khổ. Bạn đời mạnh mẽ, có cá tính riêng, hai vợ chồng cần hạ cái tôi xuống để tránh rạn nứt gia đạo.", luanGiaiNu: "Nữ kiệt mạnh mẽ, độc lập. Vợ chồng đều có lòng tự tôn cực cao, dễ xảy ra chiến tranh lạnh, cần lạt mềm buộc chặt để giữ hạnh phúc." },
          "Tuất": { napAm: "Sai Xuyến Kim", tuongTac: "Địa Chi sinh Thiên Can (Thổ sinh Kim).", luanGiai: "Trọng nghĩa khí, trung thành, hậu vận vững chắc, có uy tín. Bạn đời thấu tình đạt lý, là hậu phương vững vàng.", luanGiaiNam: "Trọng nghĩa khí, hậu vận vững chắc. Bạn đời thấu tình đạt lý, biết hy sinh, là hậu phương vững vàng lo toan chu tất việc nhà cho chồng.", luanGiaiNu: "Đáng tin cậy, chung thủy. Bạn đời là người đàn ông trung hậu, biết lo xa, vợ chồng keo sơn gắn bó vượt qua mọi biến động cuộc đời." }
        }
      },
      "Tân": {
        tinhChat: "Âm",
        hinhTuong: "Vàng bạc châu báu, trang sức lấp lánh, ngọc quý.",
        tinhCachUuDiem: "Tinh tế, lịch thiệp, có gu thẩm mỹ cao và thích sự hoàn hảo. Nhạy bén với các cơ hội và sở hữu khả năng tự làm mới mình liên tục.",
        tinhCachNhuocDiem: "Ưa hư vinh, thích thể hiện, tính tình có phần lạnh lùng và kiêu kỳ. Rất cứng lòng, một khi đã tổn thương thì khó lòng tha thứ.",
        ngheNghiep: "Trang sức, đá quý, thẩm mỹ viện, tài chính, luật sư tranh tụng, quản lý thương hiệu xa xỉ.",
        loiKhuyenCaiVan: "Nên học cách sống giản dị, bớt khắt khe với bản thân và người khác, đồng thời mở rộng lòng bao dung.",
        bienTheChi: {
          "Sửu": { napAm: "Bích Thượng Thổ", tuongTac: "Địa Chi sinh Thiên Can (Thổ sinh Kim).", luanGiai: "Tâm tính kiên định, chịu đựng giỏi, có năng lực tích lũy của cải. Bạn đời chu đáo, bao dung lòng kiêu kỳ của bạn.", luanGiaiNam: "Kiên định, chịu đựng giỏi, tích lũy tốt nhờ Ấn vượng. Người vợ chu đáo, bao dung, luôn thấu hiểu và chấp nhận lòng kiêu kỳ của chồng.", luanGiaiNu: "Nội tâm sắc sảo, có số hưởng phúc. Bạn đời hiền hậu, thầm lặng gánh vác việc gia đình, luôn là bến đỗ bình yên cho vợ." },
          "Mão": { napAm: "Tùng Bách Mộc", tuongTac: "Thiên Can khắc Địa Chi (Kim khắc Mộc).", luanGiai: "Ngoại hình thu hút, nhạy bén kinh doanh nhưng tâm tính dễ dao động. Bạn đời có năng lực, tháo vát gánh vác việc nhà.", luanGiaiNam: "Ngoại hình thu hút, nhạy bén kinh doanh. Người vợ tháo vát, đảm đang, gánh vác việc nhà chu toàn giúp chồng yên tâm phát triển sự nghiệp.", luanGiaiNu: "Tinh tế, có gu thẩm mỹ cao. Bạn đời có năng lực tháo vát, độc lập tài chính, vợ chồng cần chia sẻ nhiều để tránh khoảng cách tâm lý." },
          "Tỵ": { napAm: "Trường Lưu Thủy", tuongTac: "Địa Chi khắc Thiên Can (Hỏa khắc Kim).", luanGiai: "Thông minh, khéo léo kết giao quý nhân, số mệnh vinh hiển. Bạn đời có địa vị, hôn nhân viên mãn nếu tôn trọng nhau.", luanGiaiNam: "Khéo léo kết giao quý nhân, số mệnh vinh hiển. Người vợ có địa vị hoặc gia thế tốt, vợ chồng tôn trọng nhau, hôn nhân viên mãn.", luanGiaiNu: "Sắc sảo, khéo léo trong giao tiếp. Bạn đời là người đàn ông có năng lực, thành đạt, luôn mang lại niềm tự hào và sự bảo bọc cho vợ." },
          "Mùi": { napAm: "Lộ Bàng Thổ", tuongTac: "Địa Chi sinh Thiên Can (Thổ sinh Kim).", luanGiai: "Bản tính ôn hòa, nội tâm sắc sảo, cuộc sống bình yên, ít sóng gió. Bạn đời hiền hậu, luôn đứng sau hỗ trợ bạn.", luanGiaiNam: "Ôn hòa, nội tâm sắc sảo, cuộc sống bình yên. Người vợ hiền hậu, chăm chỉ, luôn đứng sau hỗ trợ, động viên chồng vượt qua khó khăn.", luanGiaiNu: "Tính cách kín đáo, sâu sắc. Bạn đời là người đàn ông chu đáo, yêu thương vợ con hết mực, gia đình thuận hòa, ít sóng gió." },
          "Dậu": { napAm: "Thạch Lựu Mộc", tuongTac: "Can Chi đồng hành (Kim - Kim).", luanGiai: "Tự tôn cực cao, sắc sảo, có gu thẩm mỹ và tài năng xuất chúng. Bạn đời cũng cá tính, dễ xảy ra tranh chấp khẩu thiệt.", luanGiaiNam: "Tự tôn cao, tài hoa xuất chúng. Người vợ cũng là người sắc sảo, có gu, đôi bên dễ xảy ra tranh chấp khẩu thiệt vì cái tôi ai cũng lớn.", luanGiaiNu: "Kiêu kỳ, tinh tế, ưa hoàn hảo. Hôn nhân cần sự nhường nhịn cực lớn vì cả hai vợ chồng đều cá tính, tránh chiến tranh lạnh kéo dài." },
          "Hợi": { napAm: "Sai Xuyến Kim", tuongTac: "Thiên Can sinh Địa Chi (Kim sinh Thủy).", luanGiai: "Tài hoa phát tiết ra ngoài, giỏi văn chương hoặc nghệ thuật. Bạn đời lãng mạn, tinh tế, đời sống hôn nhân phong phú.", luanGiaiNam: "Tài hoa phát tiết, giỏi nghệ thuật hoặc ngoại giao. Người vợ lãng mạn, tinh tế, đời sống hôn nhân phong phú, đầy ắp niềm vui.", luanGiaiNu: "Tài hoa, giàu cảm xúc. Bạn đời là người lãng mạn, biết chiều chuộng và luôn mang lại những bất ngờ thú vị cho cuộc sống hôn nhân." }
        }
      }
    }
  },

  "Mộc": {
    thuocTinh: {
      tieuDe: "Mệnh MỘC – \"Nhân\" (Nhân ái, Sáng tạo)",
      tongQuan: "Mộc đại diện cho sự sinh trưởng lâu dài, kết nối và che chở che bảo bọc.",
      uu: "Giàu lòng trắc ẩn, tư duy đổi mới linh hoạt, hướng ngoại.",
      nhuoc: "Dễ mủi lòng dẫn tới tin người sai chỗ, thiếu kiên nhẫn khi gặp bế tắc.",
      nhanDien: "Yêu tự nhiên, thích kết nối làm việc tập thể."
    },
    ngheNghiep: {
      dacTinh: "Tính nhân văn, nuôi dưỡng, phát triển con người, thiết kế hình khối hữu cơ.",
      viTriCongViec: [
        { nganh: "Công nghệ thông tin (IT Product)", job: ["Nhà thiết kế giao diện (UI/UX Designer)", "Chuyên viên phát triển sản phẩm (Product Owner)", "Kỹ sư giải pháp đồ họa"] },
        { nganh: "Giáo dục & Y tế cứu người", job: ["Giáo viên / Giảng viên", "Bác sĩ nội khoa", "Bác sĩ đông y / châm cứu", "Chuyên gia đào tạo doanh nghiệp (L&D)"] },
        { nganh: "Sáng tạo & Thiết kế", job: ["Thiết kế thời trang", "Thiết kế nội thất gỗ", "Kiến trúc sư cảnh quan", "Nghệ nhân cây cảnh / Bonsai"] },
        { nganh: "Nông nghiệp công nghệ cao", job: ["Kỹ sư nông nghiệp", "Chuyên gia công nghệ sinh học", "Quản lý trang trại hữu cơ", "Nghiên cứu giống cây trồng"] },
        { nganh: "Xuất bản & Truyền thống", job: ["Biên tập viên sách", "Nhà văn / Tác giả", "Chuyên viên thiết kế đồ họa in ấn", "Kinh doanh văn phòng phẩm"] }
      ]
    },
    nhatChu: {
      "Giáp": {
        tinhChat: "Dương",
        hinhTuong: "Cây cổ thụ vững chãi, vươn cao trong rừng sâu.",
        tinhCachUuDiem: "Thẳng thắn, cương trực, có chí hướng lớn và tinh thần trách nhiệm cực cao. Thích che chở, bảo vệ và làm chỗ dựa cho người khác.",
        tinhCachNhuocDiem: "Quá cố chấp, cứng nhắc, khó thích nghi với môi trường mới. Khi gặp thất bại lớn dễ bị suy sụp hoàn toàn chứ không chịu uốn cong.",
        ngheNghiep: "Lãnh đạo doanh nghiệp, quản lý dự án, chính trị, giáo dục, quy hoạch, lâm nghiệp.",
        loiKhuyenCaiVan: "Nên học cách lắng nghe ý kiến phản hồi, tập tính mềm dẻo và chuẩn bị phương án dự phòng khi đối mặt với rủi ro.",
        bienTheChi: {
          "Tý": { napAm: "Hải Trung Kim", tuongTac: "Địa Chi sinh Thiên Can (Thủy sinh Mộc).", luanGiai: "Thông minh, học thức cao, cuộc sống gặp nhiều quý nhân. Bạn đời chu đáo, là điểm tựa vững chắc.", luanGiaiNam: "Mang tư chất của bậc trượng phu học thức. Cung vợ sinh trợ giúp bạn cưới được người vợ hiền thục, chu đáo, là hậu phương vững chắc giúp chồng thăng tiến công danh.", luanGiaiNu: "Cá tính độc lập, tự chủ mạnh mẽ. Được cung Phu Thê sinh đỡ nên hôn nhân may mắn, người bạn đời có tri thức, biết chiều chuộng và che chở cho vợ trước sóng gió." },
          "Dần": { napAm: "Đại Khê Thủy", tuongTac: "Can Chi đồng hành (Mộc - Mộc).", luanGiai: "Tính cách tự lập, tự tin nhưng dễ độc đoán. Vợ chồng bình đẳng, dễ xảy ra tranh chấp quyền lực.", luanGiaiNam: "Cực kỳ tự lập nhưng có phần độc đoán, gia trưởng. Hôn nhân ở thế bình đẳng, vợ chồng đều có cái tôi lớn, dễ xảy ra tranh chấp quyền lực nếu bạn không biết nhường nhịn.", luanGiaiNu: "Mệnh 'Nữ trung hào kiệt' tự lực cánh sinh. Trong gia đình, bạn quá cứng cỏi tạo áp lực ngầm lên người chồng. Cần học cách lùi lại, mềm mỏng để gia đạo không bị chông chênh." },
          "Thìn": { napAm: "Phúc Đăng Hỏa", tuongTac: "Thiên Can khắc Địa Chi (Mộc khắc Thổ).", luanGiai: "Có đầu óc kinh doanh, giỏi quản lý tài chính. Bạn đời thực tế, biết lo toan quán xuyến gia sản.", luanGiaiNam: "Tọa Tài tinh, có đầu óc kinh doanh, giỏi quản lý kinh tế. Bạn đời là người thực tế, tháo vát, biết tay hòm chìa khóa quán xuyến tài sản rất tốt.", luanGiaiNu: "Năng lực xoay xở tài chính xuất sắc. Bạn đời là người có trách nhiệm, tập trung lo kinh tế, tuy nhiên hôn nhân đôi khi thiếu lãng mạn vì cả hai quá thực tế." },
          "Ngọ": { napAm: "Sa Trung Kim", tuongTac: "Thiên Can sinh Địa Chi (Mộc sinh Hỏa).", luanGiai: "Tài hoa, giàu sáng tạo nhưng dễ cả thèm chóng chán. Bạn đời có ngoại hình đẹp, hướng ngoại.", luanGiaiNam: "Bản tính hào sảng, tài hoa nhưng sinh xuất cho cung vợ nên rất chiều chuộng và nhún nhường bạn đời. Vợ có ngoại hình đẹp nhưng tính khí hướng ngoại, dễ tranh cãi nhỏ.", luanGiaiNu: "Đảm đang, ngoài xã hội tháo vát nhưng về nhà chịu nhiều lo toan, vất vả gánh vác cho chồng. Bạn đời cá tính mạnh, cái tôi cao, cần kiềm chế cảm xúc để tránh rạn nứt." },
          "Thân": { napAm: "Tuyền Trung Thủy", tuongTac: "Địa Chi khắc Thiên Can (Kim khắc Mộc).", luanGiai: "Cuộc sống nhiều biến động, chịu nhiều áp lực. Bạn đời nghiêm túc, quản lý chặt chẽ, dễ bất đồng.", luanGiaiNam: "Cuộc sống chịu nhiều áp lực, tọa Sát tinh. Bạn đời có tính cách nghiêm túc, quản lý chồng chặt chẽ, đôi bên dễ xảy ra bất đồng quan điểm và khẩu thiệt.", luanGiaiNu: "Thường phải lo âu, nội tâm chịu nhiều gánh nặng vô hình. Người chồng có phần gia trưởng, nghiêm khắc và hay áp đặt, cần sự nhẫn nhịn cực lớn để giữ hòa khí." },
          "Tuất": { napAm: "Sơn Đầu Hỏa", tuongTac: "Thiên Can khắc Địa Chi (Mộc khắc Thổ).", luanGiai: "Tính tình trung hậu, tọa kho tài nên có của ăn của để. Bạn đời chung thủy, biết vun vén gia đình.", luanGiaiNam: "Tọa kho tài, trung hậu và biết tích lũy của cải. Người vợ là người chung thủy, chịu khó, biết vun vén cho tổ ấm nhỏ ổn định, hậu vận an nhàn.", luanGiaiNu: "Tính tình thẳng thắn, có số giữ tiền tài ổn định. Bạn đời hiền lành, yêu thương gia đình, vợ chồng gắn bó keo sơn vượt qua nhiều thử thách." }
        }
      },
      "Ất": {
        tinhChat: "Âm",
        hinhTuong: "Cây hoa cỏ, dây leo mọc uốn lượn, mềm mại.",
        tinhCachUuDiem: "Mềm dẻo, linh hoạt, khả năng sinh tồn và thích ứng hoàn cảnh cực cao. Giỏi giao tiếp, có tính nghệ thuật và thấu hiểu lòng người.",
        tinhCachNhuocDiem: "Thiếu chính kiến, dễ bị dao động bởi ý kiến người khác, tính tình đôi khi quá nhạy cảm, ủy mị và thiếu tính quyết đoán.",
        ngheNghiep: "Thiết kế thời trang, nghệ thuật, marketing, quan hệ công chúng (PR), y học, ngoại giao.",
        loiKhuyenCaiVan: "Cần rèn luyện tính kiên định, tự tin vào năng lực bản thân và học cách từ chối khi cần thiết để tránh bị lợi dụng.",
        bienTheChi: {
          "Sửu": { napAm: "Hải Trung Kim", tuongTac: "Thiên Can khắc Địa Chi (Mộc khắc Thổ).", luanGiai: "Cần mẫn, chịu khó, tích lũy tài sản thầm lặng. Bạn đời thực tế, có phần khô khan nhưng rất trách nhiệm.", luanGiaiNam: "Cần mẫn, tích lũy của cải thầm lặng. Người vợ có tính cách thực tế, chịu thương chịu khó, tuy hơi khô khan nhưng rất trách nhiệm với gia đình chồng.", luanGiaiNu: "Nội tâm kiên cường ẩn sau vẻ ngoài mềm mỏng. Bạn đời là người coi trọng sự nghiệp, chăm chỉ làm lụng, mang lại cuộc sống vật chất ổn định." },
          "Mão": { napAm: "Đại Khê Thủy", tuongTac: "Can Chi đồng hành (Mộc - Mộc).", luanGiai: "Tâm tính thiện lương, thích giúp đỡ mọi người. Vợ chồng như bạn bè, chia sẻ nhiều nhưng dễ tranh cãi nhỏ.", luanGiaiNam: "Tâm tính lương thiện, hay giúp đỡ mọi người nhưng dễ chuốc phiền phức. Hôn nhân như hai người bạn, chia sẻ nhiều nhưng hay khắc khẩu vặt vì những chuyện nhỏ.", luanGiaiNu: "Dịu dàng, khéo léo nhưng đôi khi quá nhạy cảm. Vợ chồng đồng lòng xây dựng cuộc sống, tuy nhiên cần giảm bớt sự dỗi hờn để gia đình êm ấm." },
          "Tỵ": { napAm: "Phúc Đăng Hỏa", tuongTac: "Thiên Can sinh Địa Chi (Mộc sinh Hỏa).", luanGiai: "Thông minh xuất chúng, giỏi ứng biến, có duyên ăn nói. Bạn đời cá tính mạnh, cần không gian riêng.", luanGiaiNam: "Thông minh xuất chúng, giỏi ứng biến, giao tiếp khéo. Bạn đời là người cá tính mạnh, có phần sắc sảo, cuộc sống gia đình cần nhiều không gian riêng tư.", luanGiaiNu: "Tài hoa, có duyên ăn nói. Hôn nhân sinh xuất khiến bạn phải chăm lo cho chồng con rất nhiều. Bạn đời hướng ngoại, cần khéo léo lạt mềm buộc chặt." },
          "Mùi": { napAm: "Sa Trung Kim", tuongTac: "Thiên Can khắc Địa Chi (Mộc khắc Thổ).", luanGiai: "Tọa tài kho, có số giàu sang nếu biết nắm bắt cơ hội. Bạn đời hỗ trợ tốt về kinh tế, gia đình êm ấm.", luanGiaiNam: "Tọa tài kho, số mệnh có của ăn của để nếu biết nắm bắt cơ hội. Người vợ hỗ trợ đắc lực về mặt kinh tế, gia đình hòa thuận, ít sóng gió lớn.", luanGiaiNu: "Biết thu vén, tính cách kín đáo, sâu sắc. Bạn đời là người giỏi kiếm tiền hoặc có nền tảng gia đình vững chắc, cuộc sống hôn nhân an bình." },
          "Dậu": { napAm: "Tuyền Trung Thủy", tuongTac: "Địa Chi khắc Thiên Can (Kim khắc Mộc).", luanGiai: "Nội tâm chịu nhiều áp lực vô hình, tọa Sát tinh. Bạn đời tính cách nóng nảy, nghiêm khắc, cần nhường nhịn.", luanGiaiNam: "Tọa Sát tinh, nội tâm dễ chịu nhiều áp lực và lo âu. Người vợ có tính khí nóng nảy, nghiêm khắc, bạn cần nhường nhịn tối đa để giữ lửa hạnh phúc.", luanGiaiNu: "Bản mệnh nhạy cảm, dễ tổn thương. Người chồng có tính cách cứng nhắc, quản lý nghiêm khắc, hôn nhân cần nhiều sự thấu hiểu và chia sẻ để tránh xa cách." },
          "Hợi": { napAm: "Sơn Đầu Hỏa", tuongTac: "Địa Chi sinh Thiên Can (Thủy sinh Mộc).", luanGiai: "Nhân hậu, có phúc đức, cuộc sống bình yên nhờ Ấn tinh. Bạn đời có học thức, bao dung và che chở cho bạn.", luanGiaiNam: "Được Ấn tinh che chở nên cuộc đời bình yên, nhân hậu. Bạn đời là người có học thức, bao dung, luôn đứng ra bảo vệ chồng trước sóng gió cuộc đời.", luanGiaiNu: "Số hưởng phúc đức, cuộc sống gia đình êm đềm. Người chồng mẫu mực, biết yêu thương, trân trọng vợ và luôn là chỗ dựa kinh tế lẫn tinh thần." }
        }
      }
    }
  },

  "Thủy": {
    thuocTinh: {
      tieuDe: "Mệnh THỦY – \"Trí\" (Linh hoạt, Khôn khéo)",
      tongQuan: "Thủy mang đặc tính của nước: uyển chuyển, thấu suốt và có sức lan tỏa âm thầm.",
      uu: "Giao tiếp xuất sắc, trực giác tâm lý nhạy bén, khôn khéo.",
      nhuoc: "Tâm trạng dễ biến động thất thường, hay lo âu xa xôi.",
      nhanDien: "Thích tự do, giải quyết xung đột bằng sự mềm mỏng ôn hòa."
    },
    ngheNghiep: {
      dacTinh: "Tính linh hoạt, dòng chảy thông tin, kết nối dữ liệu đám mây, dịch chuyển.",
      viTriCongViec: [
        { nganh: "Công nghệ thông tin (Cloud & Data)", job: ["Kỹ sư điện toán đám mây (Cloud Engineer)", "Chuyên gia phân tích dữ liệu (Data Analyst)", "Quản trị viên cơ sở dữ liệu (DBA)", "Kỹ sư mạng lưới truyền dẫn"] },
        { nganh: "Chuỗi cung ứng & Logistics", job: ["Chuyên viên xuất nhập khẩu", "Quản lý chuỗi cung ứng (Supply Chain)", "Điều phối viên vận tải biển/hàng không", "Kinh doanh chuyển phát nhanh"] },
        { nganh: "Thương mại điện tử & Digital", job: ["Quản lý sàn TMĐT (Shopee, Lazada, TikTok Shop)", "Chuyên gia tối ưu hóa tìm kiếm (SEO Specialist)", "Chuyên viên chạy quảng cáo (Ads Optimizer)"] },
        { nganh: "Dịch vụ lưu động & Ngoại giao", job: ["Hướng dẫn viên du lịch", "Tiếp viên hàng không", "Nhà ngoại giao", "Tư vấn tâm lý lâm sàng", "Phiên dịch viên quốc tế"] },
        { nganh: "Ngành F&B (Đồ uống)", job: ["Chuyên gia pha chế (Barista/Bartender)", "Quản lý chuỗi cửa hàng cà phê/trà sữa", "Sản xuất nước khoáng/rượu bia"] }
      ]
    },
    nhatChu: {
      "Nhâm": {
        tinhChat: "Dương",
        hinhTuong: "Nước sông lớn, nước đại dương bao la, cuồn cuộn.",
        tinhCachUuDiem: "Thông minh, sáng suốt, có hoài bão lớn và lòng bao dung như biển cả. Giỏi ngoại giao, thích tự do và có năng lực lãnh đạo thiên bẩm.",
        tinhCachNhuocDiem: "Dễ buông thả, thiếu kiên định, tính khí có phần vô định như dòng nước đổ. Đôi khi quá ỷ vào sự thông minh mà sinh ra chủ quan.",
        ngheNghiep: "Hàng hải, logictics, thủy sản, ngoại giao, chính trị, du lịch, báo chí chí.",
        loiKhuyenCaiVan: "Hãy tập trung vào một mục tiêu cố định, rèn luyện tính kỷ luật bản thân và học cách tích lũy năng lượng thay vì phân tán.",
        bienTheChi: {
          "Tý": { napAm: "Tang Đố Mộc", tuongTac: "Can Chi đồng hành (Thủy - Thủy).", luanGiai: "Cực kỳ thông minh, dũng cảm nhưng tính cách có phần lạnh lùng, cô độc. Bạn đời tự lập, vợ chồng cần giao tiếp nhiều.", luanGiaiNam: "Thông minh, dũng cảm nhưng lạnh lùng. Người vợ tự lập, có cá tính mạnh, hai vợ chồng cần giao tiếp, chia sẻ nhiều để thấu hiểu nhau.", luanGiaiNu: "Kiên cường, bản lĩnh không kém nam giới. Vợ chồng đều có xu hướng độc lập, hôn nhân cần bớt sự lạnh lùng, tăng gắn kết cảm xúc." },
          "Dần": { napAm: "Kim Bạch Kim", tuongTac: "Thiên Can sinh Địa Chi (Thủy sinh Mộc).", luanGiai: "Tài hoa xuất chúng, phóng khoáng, cuộc sống tự tại nhiều niềm vui. Bạn đời tinh tế, biết chia sẻ hoài bão lớn.", luanGiaiNam: "Tài hoa, phóng khoáng, cuộc sống tự tại. Người vợ tinh tế, khéo léo, biết chia sẻ và luôn ủng hộ những hoài bão lớn của chồng.", luanGiaiNu: "Thông tuệ, hướng ngoại và lãng mạn. Bạn đời là người đàn ông lịch lãm, tâm lý, luôn đồng hành và thấu hiểu vợ trong mọi việc." },
          "Thìn": { napAm: "Đại Hải Thủy", tuongTac: "Thiên Can khắc Địa Chi (Thủy khắc Thổ - tọa Thổ mộ).", luanGiai: "Lòng dạ sâu sắc, mưu lược, có uy quyền và số làm đại sự. Bạn đời bản lĩnh, biết nhu biết cương giữ lửa gia đình.", luanGiaiNam: "Mưu lược, lòng dạ sâu sắc, số làm đại sự. Người vợ bản lĩnh, tháo vát, biết nhu biết cương để giữ lửa và quản lý gia đình yên ấm.", luanGiaiNu: "Sâu sắc, có uy quyền ngầm. Bạn đời là người đàn ông vững chãi, chung thủy, gánh vác kinh tế tốt và là chỗ dựa lớn cho vợ." },
          "Ngọ": { napAm: "Thiên Thượng Hỏa", tuongTac: "Thiên Can khắc Địa Chi (Thủy khắc Hỏa).", luanGiai: "Tọa tài tinh rực rỡ, giỏi đầu cơ và nhạy bén với dòng tiền. Bạn đời thu hút, tháo vát, hỗ trợ kinh tế đắc lực.", luanGiaiNam: "Tọa tài tinh rực rỡ, nhạy bén với dòng tiền. Người vợ thu hút, tháo vát, hỗ trợ đắc lực cho kinh tế và sự nghiệp của chồng.", luanGiaiNu: "Giỏi ngoại giao, có duyên tài lộc. Bạn đời có ngoại hình đẹp, năng động, vợ chồng thấu hiểu giúp gia đình giàu sang, phú quý." },
          "Thân": { napAm: "Kiếm Phong Kim", tuongTac: "Địa Chi sinh Thiên Can (Kim sinh Thủy).", luanGiai: "Được sinh vượng nên học thức uyên bác, có quý nhân trợ lực suốt đời. Bạn đời có tri thức, chỗ dựa tinh thần vững chắc.", luanGiaiNam: "Học thức uyên bác, có quý nhân trợ lực suốt đời. Người vợ có tri thức, mẫu mực, là chỗ dựa tinh thần vô cùng vững chắc cho chồng.", luanGiaiNu: "Số hưởng phúc đức, thông minh. Người chồng có học vấn cao hoặc thấu hiểu đạo lý, luôn bao dung và nâng đỡ vợ hết mực." },
          "Tuất": { napAm: "Đại Hải Thủy", tuongTac: "Địa Chi khắc Thiên Can (Thổ khắc Thủy).", luanGiai: "Chính trực, dám nghĩ dám làm, hậu vận có địa vị xã hội vững vàng. Bạn đời nề nếp, coi trọng các giá trị gia đình.", luanGiaiNam: "Chính trực, dám nghĩ dám làm, có địa vị. Người vợ nề nếp, chu đáo, coi trọng các giá trị gia đình và nuôi dạy con cái rất ngoan.", luanGiaiNu: "Bản lĩnh, trọng nghĩa khí. Bạn đời là người nghiêm túc, trách nhiệm, coi trọng gia đình, cuộc sống hôn nhân nề nếp, vững bền." }
        }
      },
      "Quý": {
        tinhChat: "Âm",
        hinhTuong: "Nước sương sớm, mưa xuân, dòng suối nhỏ thầm lặng tuần hoàn.",
        tinhCachUuDiem: "Dịu dàng, hướng nội, giàu trí tưởng tượng và khả năng thấu cảm tuyệt vời. Thích nghi hoàn cảnh nhanh chóng, khéo léo trong ứng xử.",
        tinhCachNhuocDiem: "Nhút nhát, đa sầu đa cảm, dễ bị tổn thương tâm lý. Thường thiếu cảm giác an toàn và dễ bị chìm đắm trong suy nghĩ tiêu cực.",
        ngheNghiep: "Tâm lý học, nghệ thuật sáng tác, giáo dục mầm non, tư vấn viên, nghiên cứu lịch sử.",
        loiKhuyenCaiVan: "Hãy rèn luyện ý chí kiên cường, đối mặt trực diện với thử thách và hạn chế suy diễn lung tung để tinh thần luôn thanh thản.",
        bienTheChi: {
          "Sửu": { napAm: "Tang Đố Mộc", tuongTac: "Thiên Can khắc Địa Chi (Thủy khắc Thổ).", luanGiai: "Ngoại hòa trong cương, nhẫn nại vượt qua nghịch cảnh một cách thầm lặng. Bạn đời thực tế, gánh vác trách nhiệm gia đình.", luanGiaiNam: "Ngoại hòa trong cương, nhẫn nại vượt qua nghịch cảnh. Người vợ thực tế, đảm đang, gánh vác trách nhiệm gia đình nội ngoại chu toàn.", luanGiaiNu: "Nhạy cảm nhưng kiên cường thầm lặng. Bạn đời là người nghiêm túc, chịu khó làm lụng, mang lại sự ổn định lâu dài cho tổ ấm." },
          "Mão": { napAm: "Kim Bạch Kim", tuongTac: "Thiên Can sinh Địa Chi (Thủy sinh Mộc).", luanGiai: "Tọa Thiên ất quý nhân, tâm tính thánh thiện, cuộc đời bình an may mắn. Bạn đời lãng mạn, yêu thương chiều chuộng bạn.", luanGiaiNam: "Tọa Quý nhân, tâm tính thánh thiện, cuộc đời may mắn. Người vợ lãng mạn, tinh tế, yêu thương và luôn dành cho chồng sự chăm sóc ngọt ngào.", luanGiaiNu: "Dịu dàng, nhân hậu, số hưởng phúc. Người chồng là người tâm lý, lãng mạn, luôn chiều chuộng và mang lại niềm vui cho vợ." },
          "Tỵ": { napAm: "Đại Hải Thủy", tuongTac: "Thiên Can khắc Địa Chi (Thủy khắc Hỏa).", luanGiai: "Thông minh, có lộc tài chính lớn, giỏi ngoại giao thầm lặng. Bạn đời sắc sảo, có năng lực quản lý tài sản xuất sắc.", luanGiaiNam: "Thông minh, có lộc tài chính lớn, khéo ngoại giao. Người vợ sắc sảo, nhạy bén kinh doanh, quản lý tài sản xuất sắc giúp gia sản tăng trưởng.", luanGiaiNu: "Sắc sảo, có duyên tiền tài. Bạn đời tháo vát, giỏi kiếm tiền và luôn tạo điều kiện tốt nhất cho cuộc sống của gia đình vợ." },
          "Mùi": { napAm: "Thiên Thượng Hỏa", tuongTac: "Thiên Can khắc Địa Chi (Thủy khắc Thổ).", luanGiai: "Tâm tư sâu kín, nhạy cảm, thích cuộc sống ổn định, an toàn. Bạn đời ôn hòa, là bến đỗ bình yên cho tâm hồn bạn.", luanGiaiNam: "Tâm tư sâu kín, thích cuộc sống an toàn. Người vợ ôn hòa, chu đáo, là bến đỗ bình yên giải tỏa mọi áp lực cuộc sống cho chồng.", luanGiaiNu: "Hướng nội, thích chăm sóc tổ ấm. Bạn đời là người đàn ông điềm đạm, coi trọng vợ con, hôn nhân bình lặng và hạnh phúc." },
          "Dậu": { napAm: "Kiếm Phong Kim", tuongTac: "Địa Chi sinh Thiên Can (Kim sinh Thủy).", luanGiai: "Có trực giác cực kỳ nhạy bén, thích nghiên cứu huyền học, triết học. Bạn đời hiểu biết rộng, tôn trọng không gian riêng.", luanGiaiNam: "Trực giác nhạy bén, học rộng tài cao nhờ Ấn vượng. Người vợ hiểu biết, tôn trọng không gian riêng của chồng, gia đình hòa thuận.", luanGiaiNu: "Tinh tế, giàu trí tưởng tượng. Người chồng có tri thức hoặc tư duy sâu sắc, luôn tôn trọng, lắng nghe và là điểm tựa vững chắc cho vợ." },
          "Hợi": { napAm: "Đại Hải Thủy", tuongTac: "Can Chi đồng hành (Thủy - Thủy).", luanGiai: "Thông minh, thích tự do dịch chuyển, tư duy linh hoạt độc đáo. Bạn đời phóng khoáng, cùng chung chí hướng dịch chuyển.", luanGiaiNam: "Thông minh, tư duy linh hoạt, thích tự do. Người vợ phóng khoáng, năng động, cùng chung chí hướng xây dựng tổ ấm hiện đại, nhiều trải nghiệm.", luanGiaiNu: "Hoạt bát, khéo léo ứng biến. Bạn đời phóng khoáng, yêu thương vợ, cuộc sống hôn nhân đầy ắp tiếng cười và những chuyến hành trình thú vị." }
        }
      }
    }
  },

  "Hỏa": {
    thuocTinh: {
      tieuDe: "Mệnh HỎA – \"Lễ\" (Nhiệt huyết, Thẳng thắn)",
      tongQuan: "Hỏa là ngọn lửa bùng cháy, tượng trưng cho đam mê tối thượng và tính bộc phát.",
      uu: "Tràn đầy nhiệt huyết, dũng cảm dấn thân và chuộng sự công bằng.",
      nhuoc: "Nóng tính, hành động theo cảm xúc nhất thời, cái tôi lớn.",
      nhanDien: "Năng động, tiên phong hành động quyết liệt."
    },
    ngheNghiep: {
      dacTinh: "Tính bùng nổ, thuật toán cốt lõi, xử lý tốc độ cao, tỏa sáng diện rộng.",
      viTriCongViec: [
        { nganh: "Công nghệ thông tin (AI & Code)", job: ["Kỹ sư phần mềm (Software Developer/Backend/Frontend)", "Kỹ sư trí tuệ nhân tạo (AI Engineer)", "Chuyên gia an ninh mạng / Hacker mũ trắng", "Kỹ sư lập trình Blockchain / Smart Contract"] },
        { nganh: "Truyền thông & Sáng tạo nội dung", job: ["Đạo diễn hình ảnh / Video Editor", "Người sáng tạo nội dung (Content Creator/TikToker/YouTuber)", "Copywriter sáng tạo đại chúng", "Chuyên viên truyền thông thương hiệu (PR)"] },
        { nganh: "Giải trí & Thể thao", job: ["Diễn viên / Ca sĩ / Người mẫu", "Quản lý nghệ sĩ (Artist Manager)", "Huấn luyện viên thể hình (PT)", "Vận động viên chuyên nghiệp"] },
        { nganh: "Dịch vụ làm đẹp & Ẩm thực", job: ["Chuyên viên trang điểm (Make-up Artist)", "Bác sĩ thẩm mỹ / Skincare Specialist", "Đầu bếp biểu diễn (Teppanyaki/BBQ)"] },
        { nganh: "Năng lượng & Bán hàng tốc độ", job: ["Kỹ sư điện mặt trời / điện gió", "Chuyên viên tư vấn bán hàng chốt sales nhanh", "Chuyên gia đấu giá tài sản"] }
      ]
    },
    nhatChu: {
      "Bính": {
        tinhChat: "Dương",
        hinhTuong: "Ánh mặt trời rực rỡ, chiếu sáng vạn vật.",
        tinhCachUuDiem: "Nhiệt tình, hào phóng, cởi mở và tràn đầy năng lượng tích cực. Thích thể hiện bản thân, có tài hùng biện và khả năng truyền cảm hứng.",
        tinhCachNhuocDiem: "Nóng nảy, vội vàng, thiếu kiên nhẫn. Thường thích hư vinh, ưa sĩ diện và đôi khi can thiệp quá sâu vào chuyện của người khác.",
        ngheNghiep: "Diễn giả, nghệ thuật biểu diễn, truyền thông, marketing, năng lượng, luật sư.",
        loiKhuyenCaiVan: "Nên học cách kiểm soát cảm xúc bộc phát, tĩnh tâm suy nghĩ trước khi hành động và hạ thấp cái tôi xuống.",
        bienTheChi: {
          "Tý": { napAm: "Giản Hạ Thủy", tuongTac: "Địa Chi khắc Thiên Can (Thủy khắc Hỏa).", luanGiai: "Tính cách mâu thuẫn giữa nhiệt huyết và e dè. Bạn đời nghiêm túc, có tính tự lập cao, gia đình hay tranh luận.", luanGiaiNam: "Nhiệt huyết nhưng đôi khi e dè do cung vợ khắc chế. Người vợ có tính cách tự lập cao, nghiêm túc, vợ chồng cần học cách lắng nghe để tránh khắc khẩu.", luanGiaiNu: "Cá tính mạnh, bộc trực. Người chồng là người nề nếp, có nguyên tắc đạo đức cao, hôn nhân gia đình có phần nghiêm nghị, cần tăng thêm sự lãng mạn." },
          "Dần": { napAm: "Lô Trung Hỏa", tuongTac: "Địa Chi sinh Thiên Can (Mộc sinh Hỏa).", luanGiai: "Được sinh vượng nên rất tài năng, kiên cường, dũng cảm. Bạn đời thông minh, có địa vị và trợ giúp đắc lực.", luanGiaiNam: "Được sinh vượng nên rất tài năng, kiên cường. Bạn đời là người thông minh, có học thức hoặc địa vị xã hội, hỗ trợ đắc lực cho sự nghiệp của chồng.", luanGiaiNu: "Thông tuệ, dũng cảm và có chí lớn. Hôn nhân hạnh phúc nhờ người chồng bao dung, giỏi giang và luôn thấu hiểu, chắp cánh cho những ước mơ của vợ." },
          "Thìn": { napAm: "Đại Lâm Mộc", tuongTac: "Thiên Can sinh Địa Chi (Hỏa sinh Thổ).", luanGiai: "Tâm tính rộng lượng, biết nhìn xa trông rộng, có tài lãnh đạo. Bạn đời ôn hòa, dịu dàng, gia đình yên ấm.", luanGiaiNam: "Tâm tính rộng lượng, nhìn xa trông rộng. Người vợ là người ôn hòa, dịu dàng, cư xử đúng mực giúp gia đình luôn yên ấm, thuận hòa.", luanGiaiNu: "Giỏi đối nhân xử thế, tháo vát việc nhà lẫn xã hội. Bạn đời tính tình điềm đạm, yêu thương gia đình, cuộc sống hôn nhân bình ổn, sung túc." },
          "Ngọ": { napAm: "Lộ Bàng Thổ", tuongTac: "Can Chi đồng hành (Hỏa - Hỏa).", luanGiai: "Cực kỳ nóng nảy, bộc trực, tự tôn quá cao dễ hỏng việc. Bạn đời cũng cá tính, vợ chồng cần nhường nhịn tối đa.", luanGiaiNam: "Tính khí cực kỳ nóng nảy, bộc trực, tự tôn cao. Người vợ cũng là người có cá tính mạnh, đôi bên cần hạ bớt cái tôi để tránh những đổ vỡ không đáng có.", luanGiaiNu: "Mạnh mẽ, thẳng thắn, ưa độc lập. Hôn nhân dễ xảy ra xung đột khẩu thiệt do cả hai vợ chồng đều nóng tính, cần quy tắc lạt mềm buộc chặt." },
          "Thân": { napAm: "Kiếm Phong Kim", tuongTac: "Thiên Can khắc Địa Chi (Hỏa khắc Kim).", luanGiai: "Nhạy bén với thời cuộc, giỏi kiếm tiền và thích thử thách. Bạn đời tháo vát, có năng lực tài chính xuất sắc.", luanGiaiNam: "Nhạy bén với thời cuộc, giỏi kiếm tiền. Người vợ tháo vát, có năng lực quản lý tài chính xuất sắc, giúp chồng giữ vững giang sơn kinh tế.", luanGiaiNu: "Thích thử thách, có đầu óc kinh doanh. Bạn đời là người tháo vát, mang lại tài lộc và sự hậu thuẫn kinh tế vững chắc cho cuộc sống gia đình." },
          "Tuất": { napAm: "Ốc Thượng Thổ", tuongTac: "Thiên Can sinh Địa Chi (Hỏa sinh Thổ).", luanGiai: "Trọng tình nghĩa, đáng tin cậy, hậu vận có tài lộc tích lũy. Bạn đời thấu hiểu, là chỗ dựa hậu phương vững chắc.", luanGiaiNam: "Trọng tình nghĩa, tọa kho tài, hậu vận an nhàn. Bạn đời thấu hiểu, biết hy sinh và là chỗ dựa hậu phương vững chắc cho chồng yên tâm làm việc.", luanGiaiNu: "Đáng tin cậy, chung thủy. Bạn đời là người điềm đạm, biết lo toan xa gần, gia đình gắn kết keo sơn qua mọi thăng trầm cuộc sống." }
        }
      },
      "Đinh": {
        tinhChat: "Âm",
        hinhTuong: "Ánh lửa ngọn đèn, ánh nến hoặc các vì sao đêm thầm lặng.",
        tinhCachUuDiem: "Ấm áp, chu đáo, nội tâm sâu sắc và rất tinh tế. Có khả năng cống hiến thầm lặng, bền bỉ và sở hữu trực giác cực kỳ nhạy bén.",
        tinhCachNhuocDiem: "Đa nghi, hướng nội, hay suy nghĩ tiêu cực và giữ tâm sự trong lòng. Tính khí thất thường, dễ giận dỗi nhưng khó nguôi ngoai.",
        ngheNghiep: "Nghiên cứu khoa học, tâm lý học, tư vấn tài chính, lập trình viên, nhà văn, y tế.",
        loiKhuyenCaiVan: "Hãy mở rộng lòng mình, chia sẻ tâm tư với người thân tin cậy và tham gia nhiều hoạt động cộng đồng để tăng năng lượng tích cực.",
        bienTheChi: {
          "Sửu": { napAm: "Giản Hạ Thủy", tuongTac: "Thiên Can sinh Địa Chi (Hỏa sinh Thổ).", luanGiai: "Ngoại hình điềm đạm nhưng nội tâm sắc sảo, kiên định. Bạn đời chịu thương chịu khó, vun vén gia đình chu toàn.", luanGiaiNam: "Điềm đạm bên ngoài nhưng sắc sảo bên trong. Người vợ chịu thương chịu khó, vun vén gia đình chu toàn, hiếu thảo với cha mẹ chồng.", luanGiaiNu: "Kiên định, hướng nội. Được cung Phu Thê sinh xuất nên bạn chăm sóc gia đình rất kỹ, bạn đời hiền lành, cuộc sống gia đình bình an." },
          "Mão": { napAm: "Lô Trung Hỏa", tuongTac: "Địa Chi sinh Thiên Can (Mộc sinh Hỏa).", luanGiai: "Giàu lòng trắc ẩn, yêu nghệ thuật, có duyên với tâm linh. Bạn đời tinh tế, biết chiều chuộng và thấu hiểu.", luanGiaiNam: "Yêu nghệ thuật, giàu lòng trắc ẩn. Người vợ tinh tế, biết chiều chuộng, thấu hiểu tâm tư thầm kín và là tri kỷ của chồng.", luanGiaiNu: "Trực giác nhạy bén, có duyên với tâm linh. Người chồng có học thức, lãng mạn, luôn dành cho vợ sự trân trọng và yêu thương sâu sắc." },
          "Tỵ": { napAm: "Độ Bàng Thổ", tuongTac: "Can Chi đồng hành (Hỏa - Hỏa).", luanGiai: "Mạnh mẽ độc lập ngoài dự kiến, có tham vọng lớn. Bạn đời giỏi giang, hôn nhân đôi khi có sóng gió vì cái tôi.", luanGiaiNam: "Độc lập, mạnh mẽ ngoài dự kiến, có tham vọng lớn. Bạn đời giỏi giang, hôn nhân đôi khi có sóng gió vì cái tôi của hai bên khá cao.", luanGiaiNu: "Kiên cường, tự chủ cao. Vợ chồng đều có năng lực kiếm tiền nhưng dễ xảy ra tranh chấp quyền lực vặt, cần nhường nhịn để giữ hòa khí." },
          "Mùi": { napAm: "Lộ Bàng Thổ", tuongTac: "Thiên Can sinh Địa Chi (Hỏa sinh Thổ).", luanGiai: "Tâm tính ôn hòa, cư xử đúng mực, cuộc sống an bình tự tại. Bạn đời hiền lành, yêu thương gia đình hết mực.", luanGiaiNam: "Tâm tính ôn hòa, cư xử đúng mực. Người vợ hiền lành, yêu thương gia đình hết mực, cuộc sống hôn nhân bình lặng, êm ả trôi qua.", luanGiaiNu: "Khéo léo, chu đáo. Bạn đời tính tình điềm đạm, yêu thương vợ con, gia đình hòa thuận và là tổ ấm bình yên sau giờ làm việc." },
          "Dậu": { napAm: "Kiếm Phong Kim", tuongTac: "Thiên Can khắc Địa Chi (Hỏa khắc Kim).", luanGiai: "Tọa Quý nhân và Tài tinh, số mệnh may mắn, giàu sang thầm lặng. Bạn đời có điều kiện kinh tế tốt, mang lại tài lộc.", luanGiaiNam: "Tọa Thiên ất quý nhân và Tài tinh, số mệnh may mắn. Người vợ có điều kiện kinh tế tốt hoặc tháo vát, mang lại tài lộc lớn cho chồng.", luanGiaiNu: "Số hưởng giàu sang thầm lặng. Bạn đời là người nhạy bén kinh doanh, mang lại cuộc sống vật chất sung túc và luôn cưng chiều vợ." },
          "Hợi": { napAm: "Ốc Thượng Thổ", tuongTac: "Địa Chi khắc Thiên Can (Thủy khắc Hỏa).", luanGiai: "Chính trực, tôn trọng kỷ luật, được mọi người kính trọng. Bạn đời mẫu mực, có địa vị xã hội, gia đình nề nếp.", luanGiaiNam: "Chính trực, tôn trọng kỷ luật. Người vợ mẫu mực, có nề nếp gia giáo, giúp chồng quản lý việc nhà ngăn nắp, con cái ngoan ngoãn.", luanGiaiNu: "Coi trọng giá trị gia đình. Người chồng có địa vị xã hội hoặc tính cách rất đĩnh đạc, nghiêm túc, gia đình nề nếp, hạnh phúc vững bền." }
        }
      }
    }
  },

  "Thổ": {
    thuocTinh: {
      tieuDe: "Mệnh THỔ – \"Tín\" (Vững chãi, Đáng tin cậy)",
      tongQuan: "Thổ là đất mẹ vững vàng, nuôi dưỡng vạn vật, đại diện cho lòng trung thành.",
      uu: "Giữ chữ tín, điềm đạm, kiên nhẫn tích lũy vững chắc.",
      nhuoc: "Chậm chạp, ngại bứt phá đổi mới, không thích rủi ro.",
      nhanDien: "Tác phong cẩn trọng, tỉ mỉ, là điểm tựa an toàn."
    },
    ngheNghiep: {
      dacTinh: "Tính lưu trữ, quản trị nền tảng vững chãi, quy hoạch không gian đất đai.",
      viTriCongViec: [
        { nganh: "Công nghệ thông tin (Storage & ERP)", job: ["Chuyên gia tư vấn hệ thống ERP (SAP/Oracle)", "Kỹ sư lưu trữ dữ liệu lớn (Big Data Storage)", "Kiến trúc sư giải pháp doanh nghiệp"] },
        { nganh: "Bất động sản & Xây dựng", job: ["Chuyên viên môi giới bất động sản", "Kỹ sư xây dựng dân dụng", "Chuyên gia định giá đất đai", "Kiến trúc sư quy hoạch đô thị"] },
        { nganh: "Quản trị hệ thống & Nhân sự", job: ["Trưởng phòng nhân sự (HRM)", "Chuyên viên tuyển dụng (Headhunter)", "Cố vấn chiến lược doanh nghiệp", "Chuyên gia quản trị rủi ro vận hành"] },
        { nganh: "Lưu trữ & Khai thác tài nguyên", job: ["Quản lý kho bãi / Chuỗi kho vận", "Kỹ sư địa chất / Khảo sát trắc địa", "Kinh doanh khoáng sản / Vật liệu xây dựng"] },
        { nganh: "Nông sản thực phẩm", job: ["Chuyên viên quản lý chuỗi cung ứng nông sản", "Thu mua lương thực nông sản diện rộng", "Kinh doanh thực phẩm khô"] }
      ]
    },
    nhatChu: {
      "Mậu": {
        tinhChat: "Dương",
        hinhTuong: "Đất đồi núi cao, đất thành lũy kiên cố, dày dặn.",
        tinhCachUuDiem: "Vững vàng, thành thật, trọng chữ tín và vô cùng đáng tin cậy. Có khả năng chịu đựng áp lực cực tốt, bao dung và độ lượng.",
        tinhCachNhuocDiem: "Bảo thủ, cứng nhắc, thiếu sự linh hoạt và sáng tạo. Thường có xu hướng chậm chạp trong hành động và khó tiếp thu cái mới.",
        ngheNghiep: "Bất động sản, xây dựng, kiến trúc, bảo hiểm, ngân hàng, quản lý kho bãi.",
        loiKhuyenCaiVan: "Nên tích cực thay đổi tư duy, cởi mở hơn với các xu hướng mới và tập thói quen phản ứng nhanh nhẹn trước cơ hội.",
        bienTheChi: {
          "Tý": { napAm: "Tích Lịch Hỏa", tuongTac: "Thiên Can khắc Địa Chi (Thổ khắc Thủy).", luanGiai: "Tọa Tài tinh, biết quản lý tiền bạc, cuộc sống vật chất dư dả. Bạn đời thông minh, khéo léo tay hòm chìa khóa.", luanGiaiNam: "Tọa Tài tinh, biết quản lý tiền bạc, vật chất dư dả. Người vợ thông minh, khéo léo, là người tay hòm chìa khóa vô cùng tuyệt vời.", luanGiaiNu: "Thực tế, giỏi tính toán tích lũy. Bạn đời nhạy bén kinh doanh, hỗ trợ tốt cho vợ về kinh tế, cuộc sống gia đình sung túc, ổn định." },
          "Dần": { napAm: "Thành Đầu Thổ", tuongTac: "Địa Chi khắc Thiên Can (Mộc khắc Thổ).", luanGiai: "Tính cách can trường nhưng cuộc đời nhiều thử thách gian truân. Bạn đời cá tính mạnh, hôn nhân cần nhiều thấu hiểu.", luanGiaiNam: "Can trường nhưng cuộc đời nhiều thử thách. Người vợ cá tính mạnh, thẳng thắn, hôn nhân cần sự thấu hiểu, bớt áp đặt từ phía bạn.", luanGiaiNu: "Ý chí kiên cường, dũng cảm. Người chồng có tính cách nghiêm khắc, nóng nảy, vợ chồng cần nhường nhịn nhau tối đa để tránh xung đột." },
          "Thìn": { napAm: "Đại Hải Thủy", tuongTac: "Can Chi đồng hành (Thổ - Thổ).", luanGiai: "Tự vượng kiên cố, lòng dạ sâu sắc, có uy quyền lãnh đạo. Bạn đời đảm đang, tính cách thẳng thắn, bộc trực.", luanGiaiNam: "Lòng dạ sâu sắc, có uy quyền lãnh đạo. Người vợ đảm đang, tính cách bộc trực, thẳng thắn, đôi bên cùng chí hướng xây dựng cơ nghiệp.", luanGiaiNu: "Kiên định, có uy tín. Bạn đời là người vững chãi, chung thủy, tuy ít nói lời lãng mạn nhưng vô cùng trách nhiệm với gia đình." },
          "Ngọ": { napAm: "Thiên Thượng Hỏa", tuongTac: "Địa Chi sinh Thiên Can (Hỏa sinh Thổ).", luanGiai: "Được sinh vượng nên bản tính mạnh mẽ, khẳng khái, có chí lớn. Bạn đời tài năng, nhiệt huyết, hỗ trợ sự nghiệp lớn.", luanGiaiNam: "Bản tính mạnh mẽ, khẳng khái, chí lớn nhờ được sinh vượng. Bạn đời tài năng, nhiệt huyết, hỗ trợ và thúc đẩy sự nghiệp của chồng lên cao.", luanGiaiNu: "Mạnh mẽ, tự lập cao. Được cung Phu Thê sinh trợ, người chồng là người giỏi giang, có địa vị và là chỗ dựa kinh tế vững chắc cho vợ." },
          "Thân": { napAm: "Thạch Lựu Mộc", tuongTac: "Thiên Can sinh Địa Chi (Thổ sinh Kim).", luanGiai: "Thông minh, có tài năng xuất chúng về nghệ thuật hoặc kỹ thuật. Bạn đời có năng lực giao tiếp tốt, hướng ngoại.", luanGiaiNam: "Thông minh, có tài năng xuất chúng về kỹ thuật hoặc nghệ thuật. Người vợ có năng lực giao tiếp tốt, hướng ngoại, mang lại niềm vui cho nhà chồng.", luanGiaiNu: "Sáng tạo, tinh tế. Bạn đời là người hoạt bát, khéo léo trong giao tiếp xã hội, hỗ trợ vợ rất nhiều trong công việc lẫn cuộc sống." },
          "Tuất": { napAm: "Đại Hải Thủy", tuongTac: "Can Chi đồng hành (Thổ - Thổ).", luanGiai: "Tính cách bộc trực, chung thủy, trọng nguyên tắc đạo đức. Bạn đời thực tế, gắn bó keo sơn qua gian khó.", luanGiaiNam: "Bộc trực, trọng đạo đức. Người vợ thực tế, gắn bó keo sơn cùng chồng qua những giai đoạn gian khó, hậu vận gia đình an yên.", luanGiaiNu: "Chung thủy, đáng tin cậy. Bạn đời tính tình thật thà, chăm chỉ, vợ chồng đồng lòng tích lũy của cải, gia đạo vững bền theo thời gian." }
        }
      },
      "Kỷ": {
        tinhChat: "Âm",
        hinhTuong: "Đất ruộng đồng phì nhiêu, đất vườn tược mềm mại.",
        tinhCachUuDiem: "Bản tính lương thiện, bao dung, giàu lòng nhân ái và thích chăm sóc người khác. Nhẫn nại, cẩn trọng và rất khéo tay.",
        tinhCachNhuocDiem: "Thiếu tầm nhìn xa, dễ vụn vặt và hay lo xa quá mức. Quá nhẹ dạ cả tin nên dễ bị người khác lợi dụng lòng tốt.",
        ngheNghiep: "Nông nghiệp, ẩm thực, dịch vụ khách hàng, thủ công mỹ nghệ, kế toán, y tá.",
        loiKhuyenCaiVan: "Hãy học cách bảo vệ lợi ích cá nhân, nâng cao kỹ năng nhìn người và lập kế hoạch dài hạn cho tương lai.",
        bienTheChi: {
          "Sửu": { napAm: "Tích Lịch Hỏa", tuongTac: "Can Chi đồng hành (Thổ - Thổ).", luanGiai: "Chăm chỉ, thật thà, kiên trì theo đuổi mục tiêu đến cùng. Bạn đời giản dị, đáng tin cậy, cuộc sống gia đình bình ổn.", luanGiaiNam: "Chăm chỉ, thật thà, kiên trì. Người vợ giản dị, đáng tin cậy, không ham hư vinh, cuộc sống gia đình bình ổn, tích lũy tốt.", luanGiaiNu: "Nhẫn nại, chịu thương chịu khó. Bạn đời là người đàn ông chân thành, mộc mạc, hết lòng lo cho vợ con, gia đạo êm ấm." },
          "Mão": { napAm: "Thành Đầu Thổ", tuongTac: "Địa Chi khắc Thiên Can (Mộc khắc Thổ).", luanGiai: "Nội tâm nhạy cảm, dễ lo âu và chịu thiệt thòi vì người khác. Bạn đời nghiêm khắc, hôn nhân cần sự chia sẻ.", luanGiaiNam: "Nội tâm nhạy cảm, dễ chịu thiệt thòi. Người vợ có tính cách sắc sảo, quản lý việc nhà nghiêm khắc, bạn cần khéo léo nhường nhịn.", luanGiaiNu: "Dễ lo âu, nhút nhát. Người chồng có phần nghiêm nghị, gia trưởng, bạn dễ chịu áp lực tâm lý, cần giao tiếp thẳng thắn để giải tỏa." },
          "Tỵ": { napAm: "Đại Hải Thủy", tuongTac: "Địa Chi sinh Thiên Can (Hỏa sinh Thổ).", luanGiai: "Có trực giác tốt, cuộc sống gặp nhiều may mắn, thông tuệ. Bạn đời sắc sảo, giỏi quán xuyến việc lớn nhỏ.", luanGiaiNam: "Trực giác tốt, thông tuệ, cuộc sống may mắn nhờ Ấn vượng. Người vợ sắc sảo, giỏi quán xuyến việc lớn nhỏ và rất hiểu tâm lý chồng.", luanGiaiNu: "Số hưởng phúc đức, thông minh. Bạn đời là người đàn ông tài hoa, biết lo toan xa gần và luôn che chở, bảo bọc cho vợ." },
          "Mùi": { napAm: "Thiên Thượng Hỏa", tuongTac: "Can Chi đồng hành (Thổ - Thổ).", luanGiai: "Tâm tính hiền hòa, thích cuộc sống an nhàn, tự tại. Bạn đời chu đáo, gia đình hòa thuận, ít sóng gió.", luanGiaiNam: "Tâm tính hiền hòa, thích an nhàn. Người vợ chu đáo, dịu dàng, chăm sóc gia đình nội ngoại vẹn toàn, gia đình ít sóng gió.", luanGiaiNu: "Thượng tôn gia đình, nhân hậu. Bạn đời tính tình ôn hòa, coi trọng vợ, đời sống hôn nhân bình yên, hạnh phúc tự tại." },
          "Dậu": { napAm: "Thạch Lựu Mộc", tuongTac: "Thiên Can sinh Địa Chi (Thổ sinh Kim).", luanGiai: "Tài hoa, khéo léo, tinh tế trong giao tiếp xã hội. Bạn đời có năng lực sáng tạo, mang lại niềm vui cho gia đình.", luanGiaiNam: "Tài hoa, khéo léo. Người vợ có năng lực sáng tạo tốt, hướng ngoại, biết cách làm mới tình cảm giúp hôn nhân luôn tươi mới.", luanGiaiNu: "Tinh tế trong cư xử. Bạn đời là người hoạt bát, thông minh, mang lại nhiều tiếng cười và năng lượng tích cực cho tổ ấm." },
          "Hợi": { napAm: "Đại Hải Thủy", tuongTac: "Thiên Can khắc Địa Chi (Thổ khắc Thủy).", luanGiai: "Tọa tài tinh, số có lộc bất ngờ, quản lý tiền bạc tốt. Bạn đời thông minh, nhạy bén kinh doanh, hỗ trợ tài chính.", luanGiaiNam: "Tọa tài tinh, số có lộc bất ngờ. Người vợ thông minh, nhạy bén kinh doanh, giúp đỡ và hỗ trợ rất lớn cho tài chính của chồng.", luanGiaiNu: "Quản lý tiền bạc xuất sắc. Bạn đời là người nhạy bén với dòng tiền, mang lại cuộc sống vật chất vinh hiển, gia đình sung túc." }
        }
      }
    }
  }
};

const Y_NGHIA_SO_CHU_DAO = {
  1: `<b>Danh xưng:</b> Nhà Tiên Phong Cô Độc – Người Định Hình Xu Thế.<br>
      <b>Động lực cốt lõi:</b> Khát vọng tự chủ tuyệt đối, tự tay kiến tạo vận mệnh và đứng trên đỉnh cao bằng thực lực.<br>
      <b>Thế mạnh vượt trội:</b> Sở hữu tư duy độc lập mãnh liệt, bản lĩnh kiên cường trước nghịch cảnh, năng lực ra quyết định nhanh và tố chất lãnh đạo dẫn dắt tập thể bẩm sinh.<br>
      <b>Hạn chế (Vùng tối):</b> Cái tôi quá lớn, dễ rơi vào trạng thái độc đoán, ích kỷ hoặc cô lập bản thân do xu hướng không tin tưởng vào năng lực của người khác.<br>
      <b>Bài học tiến hóa:</b> Học cách hạ cái tôi để lắng nghe, chuyển hóa từ "sức mạnh thống trị" sang "sức mạnh truyền cảm hứng" và thấu hiểu nghệ thuật ủy quyền.<br>
      <b>Môi trường kích hoạt:</b> Những nơi có tính cạnh tranh cao, áp lực lớn, hoặc các dự án khởi nghiệp khởi tạo từ con số 0.<br>
      <b>Nghề nghiệp phù hợp:</b> Chủ doanh nghiệp, giám đốc điều hành, chuyên gia độc lập, nhà sáng chế, trưởng dự án chiến lược.`,

  2: `<b>Danh xưng:</b> Sứ Giả Hòa Bình – Người Kết Nối Trực Giác.<br>
      <b>Động lực cốt lõi:</b> Sự hòa hợp trong các mối quan hệ, mong muốn xây dựng một không gian an yên, không xung đột.<br>
      <b>Thế mạnh vượt trội:</b> Trực giác cực kỳ nhạy bén, khả năng thấu cảm sâu sắc (nhìn thấu nỗi đau của người khác), khéo léo trong giao tiếp và giỏi ngoại giao hậu trường.<br>
      <b>Hạn chế (Vùng tối):</b> Thiếu quyết đoán, dễ bị phụ thuộc vào cảm xúc của đám đông, hay chịu đựng bất công vì sợ mất lòng hoặc sợ sự rạn nứt.<br>
      <b>Bài học tiến hóa:</b> Học cách thiết lập ranh giới cá nhân, dám nói "Không" khi cần thiết và đứng vững trên đôi chân của mình mà không cần điểm tựa cảm xúc.<br>
      <b>Môi trường kích hoạt:</b> Môi trường làm việc đội nhóm, các tổ chức đòi hỏi sự tận tụy, chia sẻ hoặc không gian nghệ thuật nhẹ nhàng.<br>
      <b>Nghề nghiệp phù hợp:</b> Nhà ngoại giao, chuyên gia tâm lý trị liệu, cố vấn chiến lược, chuyên viên hòa giải, trợ lý cấp cao.`,

  3: `<b>Danh xưng:</b> Nhà Truyền Cảm Hứng – Biểu Tượng Của Ngôn Từ và Trí Tuệ.<br>
      <b>Động lực cốt lõi:</b> Khát vọng thể hiện bản sắc cá nhân, lan tỏa niềm vui và tư duy tích cực đến thế giới xung quanh.<br>
      <b>Thế mạnh vượt trội:</b> Tư duy siêu linh hoạt, khả năng sử dụng ngôn từ bậc thầy (hoạt ngôn), giàu sức sáng tạo nghệ thuật và có sức hút tự nhiên trước đám đông.<br>
      <b>Hạn chế (Vùng tối):</b> Tâm trạng tùy hứng thất thường, dễ rơi vào trạng thái hời hợt, chỉ trích cay độc khi tiêu cực hoặc phung phí năng lượng vào những việc vô bổ.<br>
      <b>Bài học tiến hóa:</b> Học cách quản trị cảm xúc cá nhân, rèn luyện tính kiên trì bền bỉ và tập trung sâu vào một mục tiêu thay vì dàn trải.<br>
      <b>Môi trường kích hoạt:</b> Sân khấu, truyền thông, môi trường sáng tạo tự do, không bị bó buộc bởi khung giờ hành chính cứng nhắc.<br>
      <b>Nghề nghiệp phù hợp:</b> Diễn giả, chuyên gia Marketing sáng tạo, nghệ sĩ biểu diễn, nhà báo, chuyên gia đào tạo truyền cảm hứng.`,

  4: `<b>Danh xưng:</b> Nhà Kiến Tạo Hệ Thống – Điểm Tựa Của Sự Vững Chãi.<br>
      <b>Động lực cốt lõi:</b> Sự an toàn, tính minh bạch, rõ ràng và mưu cầu sự ổn định lâu dài dựa trên các nền tảng vững chắc.<br>
      <b>Thế mạnh vượt trội:</b> Tư duy logic thực tế sắc bén, khả năng tổ chức và vận hành hệ thống xuất sắc, tính kỷ luật cao và cực kỳ đáng tin cậy.<br>
      <b>Hạn chế (Vùng tối):</b> Quá cứng nhắc, bảo thủ, có xu hướng nghiện công việc, dễ rơi vào lối mòn tư duy và khắt khe thái quá với cấp dưới.<br>
      <b>Bài học tiến hóa:</b> Học cách mở rộng thế giới quan để tiếp nhận cái mới, cởi mở với sự thay đổi (đột phá) và bớt kiểm soát mọi chi tiết.<br>
      <b>Môi trường kích hoạt:</b> Các tổ chức có cấu trúc rõ ràng, quy trình chuẩn chỉnh, đòi hỏi sự chính xác tuyệt đối về số liệu hoặc kỹ thuật.<br>
      <b>Nghề nghiệp phù hợp:</b> Kỹ sư hệ thống, chuyên gia phân tích tài chính, giám đốc vận hành (COO), kiểm toán viên, quản lý chuỗi cung ứng.`,

  5: `<b>Danh xưng:</b> Kẻ Lữ Hành Đột Phá – Linh Hồn Của Sự Tự Do.<br>
      <b>Động lực cốt lõi:</b> Khát vọng trải nghiệm vạn vật, khám phá thế giới và phá vỡ mọi giới hạn, ranh giới cũ kỹ.<br>
      <b>Thế mạnh vượt trội:</b> Khả năng thích nghi siêu tốc với hoàn cảnh mới, tư duy đổi mới đột phá, can đảm xông pha và có khiếu bán hàng, thuyết phục xuất sắc.<br>
      <b>Hạn chế (Vùng tối):</b> Cực kỳ thiếu kiên nhẫn, dễ chán nản khi đối mặt với quy trình lặp đi lặp lại, có xu hướng sa đà vào các thú vui vô độ để trốn tránh áp lực.<br>
      <b>Bài học tiến hóa:</b> Học cách định hình sự tự do trong khuôn khổ kỷ luật, thấu hiểu giá trị của sự cam kết lâu dài và kiên trì đi đến tận cùng.<br>
      <b>Môi trường kích hoạt:</b> Môi trường năng động, liên tục thay đổi, có yếu tố dịch chuyển địa lý hoặc tiếp xúc với nhiều nền văn hóa khác nhau.<br>
      <b>Nghề nghiệp phù hợp:</b> Nhà khởi nghiệp, chuyên gia bán hàng, hướng dẫn viên quốc tế, freelancer tự do, chuyên gia săn đầu người.`,

  6: `<b>Danh xưng:</b> Người Nuôi Dưỡng Bản Mệnh – Biểu Tượng Của Tình Yêu Thương.<br>
      <b>Động lực cốt lõi:</b> Khát vọng chăm sóc, bảo vệ gánh vác trách nhiệm đối với mái ấm gia đình và sự bình an của cộng đồng.<br>
      <b>Thế mạnh vượt trội:</b> Giàu lòng bao dung trắc ẩn, khả năng gánh vác áp lực lớn vì người khác, có gu thẩm mỹ cao và thiên hướng kiến tạo không gian sống đỉnh cao.<br>
      <b>Hạn chế (Vùng tối):</b> Lo lắng thái quá dẫn đến kiểm soát ngột ngạt, dễ ôm đồm bao biện việc của người khác rồi tự sinh tâm lý oán trách, hy sinh cực đoan.<br>
      <b>Bài học tiến hóa:</b> Học cách yêu thương bản thân trước khi yêu thương người khác, buông bỏ bớt kỳ vọng và tôn trọng bài học cuộc đời của mỗi cá nhân.<br>
      <b>Môi trường kích hoạt:</b> Các môi trường mang tính chất nhân văn, y tế, giáo dục hoặc các công việc liên quan đến sáng tạo không gian ấm cúng.<br>
      <b>Nghề nghiệp phù hợp:</b> Quản trị nhân sự, bác sĩ/chuyên gia chăm sóc sức khỏe, nhà giáo dục mầm non/tâm lý học, thiết kế nội thất.`,

  7: `<b>Danh xưng:</b> Nhà Triết Học Chiến Lược – Kẻ Tìm Kiếm Chân Lý.<br>
      <b>Động lực cốt lõi:</b> Khát vọng giải mã các quy luật của vũ trụ, bản chất của vạn vật và tìm kiếm tri thức sâu sắc thông qua trải nghiệm thực tế.<br>
      <b>Thế mạnh vượt trội:</b> Năng lực tự học và phân tích chuyên sâu xuất sắc, tư duy phản biện độc lập, trực giác mang tính triết lý và sự tập trung cao độ.<br>
      <b>Hạn chế (Vùng tối):</b> Sống quá khép kín lập dị, đa nghi, có xu hướng cô lập bản thân và dễ rơi vào trạng thái lạnh lùng, phán xét người khác bằng tiêu chuẩn cao.<br>
      <b>Bài học tiến hóa:</b> Học cách mang tri thức lý thuyết ứng dụng vào thực tế cuộc sống, mở lòng chia sẻ tinh hoa với thế giới và bớt đa nghi.<br>
      <b>Môi trường kích hoạt:</b> Không gian yên tĩnh, phòng nghiên cứu độc lập, hoặc các dự án đòi hỏi chiều sâu tư duy chất xám cực cao.<br>
      <b>Nghề nghiệp phù hợp:</b> Nhà nghiên cứu khoa học, lập trình viên kiến trúc dữ liệu, nhà phân tích chiến lược, triết gia, chuyên gia bảo mật.`,

  8: `<b>Danh xưng:</b> Nhà Điều Hành Quyền Lực – Bậc Thầy Quản Trị Vật Chất.<br>
      <b>Động lực cốt lõi:</b> Sự thịnh vượng về mặt tài chính, vị thế xã hội và khát vọng kiểm soát, điều hành các dòng tiền hoặc tổ chức quy mô lớn.<br>
      <b>Thế mạnh vượt trội:</b> Ý chí thép kiên cường, tư duy nhạy bén vượt trội về cơ hội kinh doanh, năng lực quản trị rủi ro tài chính và bản lĩnh vượt qua khủng hoảng.<br>
      <b>Hạn chế (Vùng tối):</b> Dễ trở nên thực dụng, độc đoán, khó bộc lộ cảm xúc sâu sắc khiến người thân xa lánh, đánh giá con người chỉ qua thước đo vật chất.<br>
      <b>Bài học tiến hóa:</b> Học cách cân bằng giữa thế giới vật chất và đời sống tinh thần, thể hiện lòng biết ơn và sự ấm áp trong các mối quan hệ cốt lõi.<br>
      <b>Môi trường kích hoạt:</b> Sàn giao dịch, tập đoàn lớn, môi trường đầu tư, ngân hàng, hoặc những nơi đòi hỏi tư duy làm chủ dòng tiền.<br>
      <b>Nghề nghiệp phù hợp:</b> Giám đốc tài chính (CFO), chuyên gia đầu tư bất động sản, luật sư kinh tế, nhà điều hành doanh nghiệp, chủ ngân hàng tư nhân.`,

  9: `<b>Danh xưng:</b> Nhà Nhân Đạo Lý Tưởng – Người Mang Sứ Mệnh Cộng Đồng.<br>
      <b>Động lực cốt lõi:</b> Khát vọng cống hiến vì một xã hội tốt đẹp hơn, nâng tầm nhận thức và thực hiện các lý tưởng nhân văn cao cả.<br>
      <b>Thế mạnh vượt trội:</b> Uy tín cá nhân cao, giàu lòng vị tha vô điều kiện, có tầm nhìn vĩ mô về đại cục và khả năng thu phục lòng người bằng tâm đức.<br>
      <b>Hạn chế (Vùng tối):</b> Thiếu thực tế trong quản lý tài chính cá nhân, dễ rơi vào trạng thái cực đoan, u uất hoặc vỡ mộng khi thực tế không như lý tưởng.<br>
      <b>Bài học tiến hóa:</b> Học cách thực tế hóa các ước mơ vĩ đại, bắt đầu từ những việc nhỏ nhặt nhất và học cách quản trị tài chính cá nhân vững vàng.<br>
      <b>Môi trường kích hoạt:</b> Tổ chức phi chính phủ (NGO), các dự án cộng đồng phi lợi nhuận, môi trường văn hóa nghệ thuật nhân văn lớn.<br>
      <b>Nghề nghiệp phù hợp:</b> Người đứng đầu tổ chức xã hội, nhà hoạt động cộng đồng, nhà giáo dục tư tưởng, chính trị gia nhân đạo, kiến trúc sư văn hóa.`,

  11: `<b>Danh xưng:</b> Người Dẫn Đường Tâm Thức – Ngọn Hải Đăng Trực Giác.<br>
      <b>Động lực cốt lõi:</b> Đánh thức tiềm năng tâm linh hoặc tinh thần của nhân loại, mang lại sự thức tỉnh và ánh sáng tri thức cho đám đông.<br>
      <b>Thế mạnh vượt trội:</b> Sở hữu tần số trực giác siêu nhiên nhạy bén, năng lực ngoại cảm hoặc thấu thị tinh thần cao, khả năng truyền cảm hứng mang tính vĩ đại.<br>
      <b>Hạn chế (Vùng tối):</b> Dễ bị quá tải hệ thần kinh do nhạy cảm với năng lượng xấu, hay hoang mang về vị thế của bản thân và dễ mơ mộng xa rời thực tế.<br>
      <b>Bài học tiến hóa:</b> Học cách giữ đôi chân bám rễ sâu vào lòng đất (thực tế hóa), kiên định niềm tin vào tiếng nói bên trong và bảo vệ năng lượng cá nhân.<br>
      <b>Môi trường kích hoạt:</b> Các cộng đồng chữa lành, không gian thiền định, nghệ thuật đỉnh cao hoặc môi trường tư vấn tâm lý chuyên sâu.<br>
      <b>Nghề nghiệp phù hợp:</b> Chuyên gia chữa lành (Healer), bậc thầy yoga/thiền định, nhà tư vấn tâm linh, triết gia tư tưởng, nghệ sĩ truyền cảm hứng vĩ mô.`,

  22: `<b>Danh xưng:</b> Bậc Thầy Kiến Tạo Vĩ Đại – Người Hiện Thực Hóa Ước Mơ.<br> 
      <b>Động lực cốt lõi:</b> Biến những ý tưởng điên rồ, vĩ mô nhất của nhân loại thành những công trình vật chất trường tồn với thời gian.<br> <b>Thế mạnh vượt trội:</b> Tầm nhìn chiến lược mang tầm vóc quốc tế, sự kết hợp hoàn hảo giữa trực giác nhạy bén của số 11 và tính thực tế kỷ luật thép của số 4.<br> 
      <b>Hạn chế (Vùng tối):</b> Áp lực tinh thần đè nặng dễ gây kiệt quệ, xu hướng kiểm soát cực đoan ở quy mô lớn và lạnh lùng tàn nhẫn khi thực hiện mục tiêu.<br> 
      <b>Bài học tiến hóa:</b> Lòng bao dung đối với sự yếu đuối của người khác, học cách thả lỏng để bảo vệ sức khỏe hệ thần kinh và tin tưởng vào tiến trình tự nhiên.<br> 
      <b>Môi trường kích hoạt:</b> Các tập đoàn đa quốc gia, các công trình thế kỷ, tổ chức quy hoạch chính sách vĩ mô toàn cầu.<br> 
      <b>Nghề nghiệp phù hợp:</b> Nhà quy hoạch chiến lược quốc gia, kiến trúc sư trưởng công trình vĩ mô, nhà ngoại giao quốc tế, nhà tài phiệt kiến tạo công nghệ.`,
  
  33: `<b>Danh xưng:</b> Bậc Thầy Chữa Lành Vô Điều Kiện – Trái Tim Của Nhân Loại.<br> 
      <b>Động lực cốt lõi:</b> Lan tỏa tình yêu thương thuần khiết, xoa dịu mọi vết thương lòng và nâng đỡ linh hồn của những người yếu thế.<br> <b>Thế mạnh vượt trội:</b> Năng lượng yêu thương có sức mạnh chuyển hóa vạn vật, khả năng bảo bọc nâng đỡ tự nhiên cực mạnh, tấm lòng từ bi vô bờ bến.<br> 
      <b>Hạn chế (Vùng tối):</b> Dễ rơi vào cái bẫy "vị nghệ thuật", gánh vác quá nhiều nỗi đau của thế gian dẫn đến kiệt quệ sinh lực, hy sinh bản thân cho những người không xứng đáng.<br> 
      <b>Bài học tiến hóa:</b> Học cách bảo vệ bệ đỡ năng lượng của chính mình, thấu hiểu rằng đau khổ cũng là một bài học bắt buộc phải trải qua của mỗi linh hồn.<br> 
      <b>Môi trường kích hoạt:</b> Các trung tâm cứu trợ quốc tế, bệnh viện dưỡng lão, môi trường nghệ thuật hàn gắn, hoặc viện nghiên cứu y học nhân văn.<br> 
      <b>Nghề nghiệp phù hợp:</b> Người sáng lập tổ chức từ thiện quốc tế, bác sĩ tâm thần trị liệu vĩ mô, nhà truyền giáo, người thầy dẫn dắt tinh thần đại chúng.`
};

// Ma trận hướng
const MA_TRAN_HUONG = {
    "Tốn": {
      tot: [
        { h: "Bắc (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Nam (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Đông (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Đông Nam (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Đông Bắc (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Tây Nam (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Tây (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." },
        { h: "Tây Bắc (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." }
      ]
    },
    "Khôn": {
      tot: [
        { h: "Đông Bắc (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Tây (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Tây Bắc (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Tây Nam (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Bắc (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Nam (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Đông (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." },
        { h: "Đông Nam (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." }
      ]
    },
    "Khảm": {
      tot: [
        { h: "Đông Nam (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Đông (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Nam (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Bắc (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Tây Nam (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Đông Bắc (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Tây (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." },
        { h: "Tây Bắc (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." }
      ]
    },
    "Ly": {
      tot: [
        { h: "Đông (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Đông Nam (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Bắc (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Nam (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Tây Bắc (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Tây (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Đông Bắc (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." },
        { h: "Tây Nam (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." }
      ]
    },
    "Chấn": {
      tot: [
        { h: "Nam (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Bắc (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Đông Nam (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Đông (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Tây (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Tây Bắc (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Tây Nam (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." },
        { h: "Đông Bắc (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." }
      ]
    },
    "Cấn": {
      tot: [
        { h: "Tây Nam (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Tây Bắc (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Tây (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Đông Bắc (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Đông Nam (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Bắc (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Nam (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." },
        { h: "Đông (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." }
      ]
    },
    "Đoài": {
      tot: [
        { h: "Tây Bắc (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Tây Nam (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Đông Bắc (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Tây (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Đông (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Nam (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Bắc (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." },
        { h: "Đông Nam (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." }
      ]
    },
    "Càn": {
      tot: [
        { h: "Tây (Sinh Khí)", d: "Thịnh vượng, phát đạt, tài lộc dồi dào." },
        { h: "Đông Bắc (Thiên Y)", d: "Bình an, tiêu trừ bệnh tật, có quý nhân trợ." },
        { h: "Tây Nam (Diên Niên)", d: "Gia đạo thuận hòa, phát triển ngoại giao." },
        { h: "Tây Bắc (Phục Vị)", d: "Củng cố sức mạnh tinh thần, tiến bộ vững chắc." }
      ],
      xau: [
        { h: "Nam (Tuyệt Mệnh)", d: "Suy bại, tổn hao sức khỏe hoặc bất ổn." },
        { h: "Đông (Ngũ Quỷ)", d: "Mất mát nguồn thu, tranh chấp pháp lý thị phi." },
        { h: "Đông Nam (Họa Hại)", d: "Kế hoạch bất thành, tiểu nhân quấy phá ngầm." },
        { h: "Bắc (Lục Sát)", d: "Trục trặc tình duyên, tai tiếng không đáng có." }
      ]
    }
  };

// Ma trận cung phi
const MA_TRAN_CUNG_PHI = {
  "Tốn":  { hop: "Đỏ, Hồng, Tím, Cam, Xanh lá cây", ky: "Trắng, Xám, Ghi" },
  "Khôn": { hop: "Đỏ, Hồng, Tím, Cam, Vàng đất, Nâu đất", ky: "Xanh lá cây, Xanh rêu" },
  "Khảm": { hop: "Trắng, Xám, Ghi, Đen, Xanh nước biển", ky: "Vàng, Nâu đất" },
  "Ly":   { hop: "Xanh lá cây, Đỏ, Hồng, Tím, Cam", ky: "Đen, Xanh nước biển" },
  "Chấn": { hop: "Đen, Xanh nước biển, Xanh lá cây", ky: "Trắng, Xám, Ghi" },
  "Cấn":  { hop: "Đỏ, Hồng, Tím, Cam, Vàng đất, Nâu đất", ky: "Xanh lá cây, Xanh rêu" },
  "Đoài": { hop: "Vàng đất, Nâu đất, Trắng, Xám, Ghi", ky: "Đỏ, Hồng, Tím" },
  "Càn":  { hop: "Vàng đất, Nâu đất, Trắng, Xám, Ghi", ky: "Đỏ, Hồng, Tím" }
};

const MA_HEX_MAU = {
  "Đỏ": "#ef4444",
  "Hồng": "#f472b6",
  "Tím": "#a855f7",
  "Cam": "#f97316",
  "Vàng": "#fbbf24",
  "Vàng đất": "#ca8a04",
  "Nâu": "#654321",
  "Nâu đất": "#854d0e",
  "Trắng": "#ffffff",
  "Xám": "#94a3b8",
  "Ghi": "#64748b",
  "Ghi ánh kim": "#cbd5e1",
  "Đen": "#0f172a",
  "Xanh nước biển": "#2563eb",
  "Xanh da trời": "#38bdf8",
  "Xanh nước": "#1d4ed8",
  "Xanh lá": "#10b981",
  "Xanh lá cây": "#22c55e",
  "Xanh lục": "#16a34a",
  "Xanh rêu": "#3f6212"
};

const MA_CHU_TEXT_COLOR = {
  "Trắng": "#1e293b", "Vàng": "#1e293b", "Ghi ánh kim": "#e2e8f0"
};

const MAP_CHU_SANG_SO = {
  'A': 1, 'J': 1, 'S': 1,
  'B': 2, 'K': 2, 'T': 2,
  'C': 3, 'L': 3, 'U': 3,
  'D': 4, 'M': 4, 'V': 4,
  'E': 5, 'N': 5, 'W': 5,
  'F': 6, 'O': 6, 'X': 6,
  'G': 7, 'P': 7, 'Y': 7,
  'H': 8, 'Q': 8, 'Z': 8,
  'I': 9, 'R': 9
};

const TRUC_MUI_TEN = [
  { id: "h1", name: "Trục Thực Tế (1-4-7)", nums: [1,4,7]},
  { id: "h2", name: "Trục Tình Cảm (2-5-8)", nums: [2,5,8]},
  { id: "h3", name: "Trục Trí Tuệ (3-6-9)", nums: [3,6,9]},
  { id: "v1", name: "Trục Kế Hoạch (1-2-3)", nums: [1,2,3]},
  { id: "v2", name: "Trục Ý Chí (4-5-6)", nums: [4,5,6]},
  { id: "v3", name: "Trục Hoạt Động (7-8-9)", nums: [7,8,9]},
  { id: "d1", name: "Trục Quyết Tâm (1-5-9)", nums: [1,5,9]},
  { id: "d2", name: "Trục Nhận Thức (3-5-7)", nums: [3,5,7]}
];

const MO_TA_CAC_SO = {
  1: { title: "Số 1 (Cái tôi & Bản ngã)", text: "Đại diện cho cái tôi cá nhân, cách thức thể hiện bản thân ra thế giới bên ngoài và năng lực giao tiếp thực tế." },
  2: { title: "Số 2 (Trực giác & Thấu cảm)", text: "Biểu trưng cho mức độ nhạy cảm, trực giác tâm hồn, lòng thấu cảm và khả năng hợp tác, kết nối hài hòa." },
  3: { title: "Số 3 (Trí tuệ & Sáng tạo)", text: "Thể hiện tư duy logic, trí nhớ, khả năng phân tích dữ liệu, năng lực học hỏi và đầu óc sáng tạo ngôn từ." },
  4: { title: "Số 4 (Kỷ luật & Thực tế)", text: "Phản ánh tính thực tiễn, tính tổ chức, kỷ luật gọn gàng, sự vững chãi và năng lực vận hành cấu trúc." },
  5: { title: "Số 5 (Tự do & Kết nối)", text: "Đại diện cho khao khát tự do, trải nghiệm thế giới, cảm xúc nhạy bén, tính nghệ thuật và lòng yêu thương." },
  6: { title: "Số 6 (Trách nhiệm & Sáng tạo)", text: "Biểu thị tình yêu thương gia đình, tinh thần trách nhiệm cao, sự cống hiến cho tổ chức và óc sáng tạo yên bình." },
  7: { title: "Số 7 (Trải nghiệm & Bài học)", text: "Khát vọng tự mình chiêm nghiệm cuộc sống, học hỏi sâu sắc thông qua các trải nghiệm thực tế và thử thách bản thân." },
  8: { title: "Số 8 (Độc lập & Trí tuệ)", text: "Thể hiện tính độc lập cao, tư duy thực tế nhạy bén, năng lực tài chính, quản trị tổ chức hoặc điều hành kinh doanh." },
  9: { title: "Số 9 (Hoài bão & Nhân văn)", text: "Đại diện cho lý tưởng sống lớn, ước vọng nhân văn, lòng nhân ái bao la và tinh thần trách nhiệm với cộng đồng." }
};

const QUY_LUAT_SINH = { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" };
const QUY_LUAT_KHAC = { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" };
const MAP_HANH_CAN = { 
  "Giáp": "Mộc", "Ất": "Mộc", "Bính": "Hỏa", "Đinh": "Hỏa", 
  "Mậu": "Thổ", "Kỷ": "Thổ", "Canh": "Kim", "Tân": "Kim", "Nhâm": "Thủy", "Quý": "Thủy" 
};
const MAP_HANH_CHI = { 
  "Tý": "Thủy", "Sửu": "Thổ", "Dần": "Mộc", "Mão": "Mộc", "Thìn": "Thổ", "Tỵ": "Hỏa", 
  "Ngọ": "Hỏa", "Mùi": "Thổ", "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Thủy" 
};

// Bản khí cốt lõi của Can và Chi để nội suy Thập Thần
const AM_DUONG_CAN = {
  "Giáp": "Dương", "Bính": "Dương", "Mậu": "Dương", "Canh": "Dương", "Nhâm": "Dương",
  "Ất": "Âm", "Đinh": "Âm", "Kỷ": "Âm", "Tân": "Âm", "Quý": "Âm"
};
const AM_DUONG_CHI = {
  "Tý": "Âm", "Dần": "Dương", "Thìn": "Dương", "Ngọ": "Âm", "Thân": "Dương", "Tuất": "Dương",
  "Sửu": "Âm", "Mão": "Âm", "Tỵ": "Dương", "Mùi": "Âm", "Dậu": "Âm", "Hợi": "Dương"
};

const MA_TRAN_THAP_THAN = {
  "Chính Tài": {
    tieuDe: "Tích Lũy & Thu Nhập Cố Định",
    nghia: "Năng lượng từ công việc chính, tiền bạc đến từ sự chăm chỉ, an toàn.",
    khuyen: "Tập trung tối ưu hóa công việc hiện tại. Lập kế hoạch tiết kiệm kỷ luật, ưu tiên mua sắm tài sản an toàn thay vì đầu tư lướt sóng."
  },
  "Thiên Tài": {
    tieuDe: "Cơ Hội Đầu Tư & Tài Lộc Bất Ngờ",
    nghia: "Dòng tiền từ nguồn ngoài (đầu tư, kinh doanh tay trái, hoa hồng).",
    khuyen: "Mở rộng danh mục đầu tư (bất động sản, chứng khoán). Có thể thử sức với các dự án kinh doanh phụ hoặc nhận thêm job ngoài."
  },
  "Chính Quan": {
    tieuDe: "Thăng Tiến & Xây Dựng Uy Tín",
    nghia: "Sự nghiệp thăng tiến, được cấp trên công nhận, môi trường kỷ luật.",
    khuyen: "Mạnh dạn đề xuất tăng lương hoặc nhận vị trí quản lý. Thi cử, làm chứng chỉ hoặc xây dựng thương hiệu cá nhân chuyên nghiệp."
  },
  "Thất Sát": {
    tieuDe: "Áp Lực Kịch Trần & Đột Phá Nghịch Cảnh",
    nghia: "Thách thức lớn từ cấp trên, đối thủ cạnh tranh, áp lực đè nặng.",
    khuyen: "Tuyệt đối giữ bình tĩnh trước khủng hoảng. Biến áp lực thành động lực đột phá. Tránh đối đầu trực diện, cẩn trọng rà soát pháp lý."
  },
  "Chính Ấn": {
    tieuDe: "Quý Nhân Nâng Đỡ & Trau Dồi Học Vấn",
    nghia: "Được người lớn tuổi/cấp trên che chở, học hành thuận lợi, an toàn.",
    khuyen: "Đây là thời điểm vàng để đăng ký các khóa học nâng cao nghiệp vụ, tìm kiếm người cố vấn (Mentor), hoặc hoàn thiện các hồ sơ giấy tờ."
  },
  "Thiên Ấn": {
    tieuDe: "Sáng Tạo Đột Phá & Kỹ Năng Độc Bản",
    nghia: "Tư duy khác biệt, trực giác nhạy bén, thiên hướng làm việc độc lập.",
    khuyen: "Hãy tin vào trực giác. Đầu tư nghiên cứu công nghệ mới hoặc phát triển các ngách sản phẩm/dịch vụ độc lạ chưa ai làm."
  },
  "Tỷ Kiên": {
    tieuDe: "Củng Cố Nội Lực & Xây Dựng Đồng Đội",
    nghia: "Bạn bè, đồng nghiệp song hành, tăng cường kết nối nhưng phải chia sẻ quyền lợi.",
    khuyen: "Làm việc nhóm sẽ mang lại hiệu quả cao hơn làm một mình. Hãy mở rộng mạng lưới quan hệ (Networking), nhưng cần minh bạch vai trò."
  },
  "Kiếp Tài": {
    tieuDe: "Cạnh Tranh Khốc Liệt & Quản Trị Dòng Tiền",
    nghia: "Áp lực cạnh tranh cao, dễ mất tiền, bị người khác tranh giành công lao.",
    khuyen: "Bảo mật tuyệt đối ý tưởng kinh doanh. Tuyệt đối không cho vay mượn tiền bạc, không hùn vốn làm ăn, chuẩn bị quỹ dự phòng rủi ro."
  },
  "Thực Thần": {
    tieuDe: "Thưởng Thức Cuộc Sống & Tài Lộc Tự Nhiên",
    nghia: "Cuộc sống thảnh thơi, lộc ăn uống, tiền bạc tự chảy về không cần tranh giành.",
    khuyen: "Dành thời gian chăm sóc sức khỏe, gia đình. Các khoản đầu tư dài hạn sẽ tự sinh lời. Đừng quá cố gắng cưỡng cầu những dự án mệt mỏi."
  },
  "Thương Quan": {
    tieuDe: "Đổi Mới Tư Duy & Bứt Phá Giới Hạn",
    nghia: "Thích tự do, muốn nổi loạn, dễ bất đồng với sếp nhưng khả năng bứt phá cực cao.",
    khuyen: "Thời điểm tuyệt vời để khởi nghiệp hoặc thay đổi quy trình cũ kỹ. Cẩn trọng kiểm soát 'cái tôi' và lời ăn tiếng nói để tránh thị phi."
  }
};

const NAP_AM = {
  "Giáp Tý": {
    m: "Kim",
    y: "Hải Trung Kim"
  },
  "Ất Sửu": {
    m: "Kim",
    y: "Hải Trung Kim"
  },
  "Bính Dần": {
    m: "Hỏa",
    y: "Lư Trung Hỏa"
  },
  "Đinh Mão": {
    m: "Hỏa",
    y: "Lư Trung Hỏa"
  },
  "Mậu Thìn": {
    m: "Mộc",
    y: "Đại Lâm Mộc"
  },
  "Kỷ Tỵ": {
    m: "Mộc",
    y: "Đại Lâm Mộc"
  },
  "Canh Ngọ": {
    m: "Thổ",
    y: "Lộ Bàng Thổ"
  },
  "Tân Mùi": {
    m: "Thổ",
    y: "Lộ Bàng Thổ"
  },
  "Nhâm Thân": {
    m: "Kim",
    y: "Kiếm Phong Kim"
  },
  "Quý Dậu": {
    m: "Kim",
    y: "Kiếm Phong Kim"
  },
  "Giáp Tuất": {
    m: "Hỏa",
    y: "Sơn Đầu Hỏa"
  },
  "Ất Hợi": {
    m: "Hỏa",
    y: "Sơn Đầu Hỏa"
  },
  "Bính Tý": {
    m: "Thủy",
    y: "Giản Hạ Thủy"
  },
  "Đinh Sửu": {
    m: "Thủy",
    y: "Giản Hạ Thủy"
  },
  "Mậu Dần": {
    m: "Thổ",
    y: "Thành Đầu Thổ"
  },
  "Kỷ Mão": {
    m: "Thổ",
    y: "Thành Đầu Thổ"
  },
  "Canh Thìn": {
    m: "Kim",
    y: "Bạch Lạp Kim"
  },
  "Tân Tỵ": {
    m: "Kim",
    y: "Bạch Lạp Kim"
  },
  "Nhâm Ngọ": {
    m: "Mộc",
    y: "Dương Liễu Mộc"
  },
  "Quý Mùi": {
    m: "Mộc",
    y: "Dương Liễu Mộc"
  },
  "Giáp Thân": {
    m: "Thủy",
    y: "Tuyền Trung Thủy"
  },
  "Ất Dậu": {
    m: "Thủy",
    y: "Tuyền Trung Thủy"
  },
  "Bính Tuất": {
    m: "Thổ",
    y: "Ốc Thượng Thổ"
  },
  "Đinh Hợi": {
    m: "Thổ",
    y: "Ốc Thượng Thổ"
  },
  "Mậu Tý": {
    m: "Hỏa",
    y: "Tích Lịch Hỏa"
  },
  "Kỷ Sửu": {
    m: "Hỏa",
    y: "Tích Lịch Hỏa"
  },
  "Canh Dần": {
    m: "Mộc",
    y: "Tùng Bách Mộc"
  },
  "Tân Mão": {
    m: "Mộc",
    y: "Tùng Bách Mộc"
  },
  "Nhâm Thìn": {
    m: "Thủy",
    y: "Trường Lưu Thủy"
  },
  "Quý Tỵ": {
    m: "Thủy",
    y: "Trường Lưu Thủy"
  },
  "Giáp Ngọ": {
    m: "Kim",
    y: "Sa Trung Kim"
  },
  "Ất Mùi": {
    m: "Kim",
    y: "Sa Trung Kim"
  },
  "Bính Thân": {
    m: "Hỏa",
    y: "Sơn Hạ Hỏa"
  },
  "Đinh Dậu": {
    m: "Hỏa",
    y: "Sơn Hạ Hỏa"
  },
  "Mậu Tuất": {
    m: "Mộc",
    y: "Bình Địa Mộc"
  },
  "Kỷ Hợi": {
    m: "Mộc",
    y: "Bình Địa Mộc"
  },
  "Canh Tý": {
    m: "Thủy",
    y: "Bích Thượng Thổ"
  },
  "Tân Sửu": {
    m: "Thủy",
    y: "Bích Thượng Thổ"
  },
  "Nhâm Dần": {
    m: "Kim",
    y: "Kim Bạch Kim"
  },
  "Quý Mão": {
    m: "Kim",
    y: "Kim Bạch Kim"
  },
  "Giáp Thìn": {
    m: "Hỏa",
    y: "Phúc Đăng Hỏa"
  },
  "Ất Tỵ": {
    m: "Hỏa",
    y: "Phúc Đăng Hỏa"
  },
  "Bính Ngọ": {
    m: "Thủy",
    y: "Thiên Hà Thủy"
  },
  "Đinh Mùi": {
    m: "Thủy",
    y: "Thiên Hà Thủy"
  },
  "Mậu Thân": {
    m: "Thổ",
    y: "Đại Trạch Thổ"
  },
  "Kỷ Dậu": {
    m: "Thổ",
    y: "Đại Trạch Thổ"
  },
  "Canh Tuất": {
    m: "Kim",
    "y": "Thoa Xuyến Kim"
  },
  "Tân Hợi": {
    m: "Kim",
    "y": "Thoa Xuyến Kim"
  },
  "Nhâm Tý": {
    m: "Mộc",
    y: "Tang Đố Mộc"
  },
  "Quý Sửu": {
    m: "Mộc",
    y: "Tang Đố Mộc"
  },
  "Giáp Dần": {
    m: "Thủy",
    y: "Đại Khê Thủy"
  },
  "Ất Mão": {
    m: "Thủy",
    y: "Đại Khê Thủy"
  },
  "Bính Thìn": {
    m: "Thổ",
    y: "Sa Trung Thổ"
  },
  "Đinh Tỵ": {
    m: "Thổ",
    y: "Sa Trung Thổ"
  },
  "Mậu Ngọ": {
    m: "Hỏa",
    y: "Thiên Thượng Hỏa"
  },
  "Kỷ Mùi": {
    m: "Hỏa",
    y: "Thiên Thượng Hỏa"
  },
  "Canh Thân": {
    m: "Mộc",
    y: "Thạch Lựu Mộc"
  },
  "Tân Dậu": {
    m: "Mộc",
    y: "Thạch Lựu Mộc"
  },
  "Nhâm Tuất": {
    m: "Thủy",
    y: "Đại Hải Thủy"
  },
  "Quý Hợi": {
    m: "Thủy",
    y: "Đại Hải Thủy"
  }
};

const QUAN_HE_NGU_HANH = {
  "Mộc": { "Mộc": { cung: "Tỷ Kiên", khac: "Kiếp Tài" }, "Hỏa": { cung: "Thực Thần", khac: "Thương Quan" }, "Thổ": { cung: "Thiên Tài", khac: "Chính Tài" }, "Kim": { cung: "Thất Sát", khac: "Chính Quan" }, "Thủy": { cung: "Thiên Ấn", khac: "Chính Ấn" } },
  "Hỏa": { "Hỏa": { cung: "Tỷ Kiên", khac: "Kiếp Tài" }, "Thổ": { cung: "Thực Thần", khac: "Thương Quan" }, "Thủy": { cung: "Thất Sát", khac: "Chính Quan" }, "Kim": { cung: "Thiên Tài", khac: "Chính Tài" }, "Mộc": { cung: "Thiên Ấn", khac: "Chính Ấn" } },
  "Thổ": { "Thổ": { cung: "Tỷ Kiên", khac: "Kiếp Tài" }, "Kim": { cung: "Thực Thần", khac: "Thương Quan" }, "Mộc": { cung: "Thất Sát", khac: "Chính Quan" }, "Thủy": { cung: "Thiên Tài", khac: "Chính Tài" }, "Hỏa": { cung: "Thiên Ấn", khac: "Chính Ấn" } },
  "Kim": { "Kim": { cung: "Tỷ Kiên", khac: "Kiếp Tài" }, "Thủy": { cung: "Thực Thần", khac: "Thương Quan" }, "Hỏa": { cung: "Thất Sát", khac: "Chính Quan" }, "Mộc": { cung: "Thiên Tài", khac: "Chính Tài" }, "Thổ": { cung: "Thiên Ấn", khac: "Chính Ấn" } },
  "Thủy": { "Thủy": { cung: "Tỷ Kiên", khac: "Kiếp Tài" }, "Mộc": { cung: "Thực Thần", khac: "Thương Quan" }, "Kim": { cung: "Thất Sát", khac: "Chính Quan" }, "Hỏa": { cung: "Thiên Tài", khac: "Chính Tài" }, "Thổ": { cung: "Thiên Ấn", khac: "Chính Ấn" } }
};

const TU_DIEN_VAT_PHAM = {
  "Mộc": { v: "Ưu tiên đeo vòng gỗ sưa, gỗ trầm hương, trồng cây xanh quanh bàn làm việc.", k: "Hình trụ đứng, khối thẳng cao" },
  "Hỏa": { v: "Đặt thạch anh tím, đá mắt hổ đỏ, sử dụng đèn chiếu sáng màu ấm hoặc khối chóp nhọn.", k: "Hình chóp nhọn, khối tam giác" },
  "Thổ": { v: "Đeo vòng đá mã não vàng, thạch anh tóc vàng, đặt các thực thể gốm sứ hoặc khối vuông.", k: "Hình vuông, khối lập phương vững chãi" },
  "Kim": { v: "Đeo trang sức vàng bạc, tỳ hưu đồng, sử dụng đồng xu phong thủy hoặc khối cầu kim loại.", k: "Hình tròn, khối cầu đồng tâm" },
  "Thủy": { v: "Đặt bể cá nhỏ, phong thủy luân (đài phun nước) hoặc khối pha lê uốn lượn.", k: "Hình lượn sóng, khối uốn lượn" }
};

const HE_SO_TRU = { 
  "Nam": 0.8,
  "Thang": 2.8,
  "Ngay": 1.2,
  "Gio": 1.0
};

const MA_TRAN_TU_HINH = {
  "Ngọ":  { h: "Hỏa",  hs: 1.22 }, // Tự hình Ngọ Ngọ đẩy mạnh nhiệt lượng Hỏa khí
  "Dậu":  { h: "Kim",  hs: 1.15 }, // Tự hình Dậu Dậu tăng tính cô độc, sắc bén của Kim khí
  "Thìn": { h: "Thổ",  hs: 1.15 }, // Tự hình Thìn Thìn tăng tính trì trệ, ứ đọng của Thổ khí
  "Hợi":  { h: "Thủy", hs: 1.15 }  // Tự hình Hợi Hợi tăng tính bất định, tràn trề của Thủy khí
};

const MA_TRAN_DIA_CHI = {
  "Tý":   [ { h: "Thủy", tl: 1.0 } ],
  "Mão":  [ { h: "Mộc",  tl: 1.0 } ],
  "Dậu":  [ { h: "Kim",  tl: 1.0 } ],
  "Ngọ":  [ { h: "Hỏa", tl: 0.9 }, { h: "Thổ", tl: 0.1 } ], 
  "Tỵ":   [ { h: "Hỏa", tl: 0.8 }, { h: "Thổ", tl: 0.1 }, { h: "Kim", tl: 0.1 } ], 
  "Dần":  [ { h: "Mộc", tl: 0.7 }, { h: "Hỏa", tl: 0.2 }, { h: "Thổ", tl: 0.1 } ],
  "Thân": [ { h: "Kim", tl: 0.7 }, { h: "Thủy", tl: 0.2 }, { h: "Thổ", tl: 0.1 } ],
  "Hợi":  [ { h: "Thủy", tl: 0.8 }, { h: "Mộc",  tl: 0.2 } ],
  "Thìn": [ { h: "Thổ", tl: 0.6 }, { h: "Mộc",  tl: 0.2 }, { h: "Thủy", tl: 0.2 } ],
  "Tuất": [ { h: "Thổ", tl: 0.6 }, { h: "Kim",  tl: 0.2 }, { h: "Hỏa", tl: 0.2 } ],
  "Sửu":  [ { h: "Thổ", tl: 0.6 }, { h: "Thủy", tl: 0.2 }, { h: "Kim", tl: 0.2 } ],
  "Mùi":  [ { h: "Thổ", tl: 0.6 }, { h: "Hỏa",  tl: 0.2 }, { h: "Mộc", tl: 0.2 } ]
};

let HE_SO_NANG_LUONG = { "Mộc": 0, "Hỏa": 0, "Thổ": 0, "Kim": 0, "Thủy": 0 };

const MA_TRAN_LUC_XUNG = [
  { c1: "Tý",  c2: "Ngọ",  loai: "Thủy_Hỏa_Xung", hKhac: "Thủy", hBiKhac: "Hỏa" },
  { c1: "Hợi", c2: "Tỵ",   loai: "Thủy_Hỏa_Xung", hKhac: "Thủy", hBiKhac: "Hỏa" },
  { c1: "Dậu", c2: "Mão",  loai: "Kim_Mộc_Xung",  hKhac: "Kim",  hBiKhac: "Mộc" },
  { c1: "Thân", c2: "Dần",  loai: "Kim_Mộc_Xung",  hKhac: "Kim",  hBiKhac: "Mộc" },
  { c1: "Thìn", c2: "Tuất", loai: "Thổ_Xung_Vượng", hKhac: "Thổ",  hBiKhac: "Thổ" },
  { c1: "Sửu", c2: "Mùi",  loai: "Thổ_Xung_Vượng", hKhac: "Thổ",  hBiKhac: "Thổ" }
];

const TU_DIEN_MANG_MAU_PHONG_THUY = {
  "Mộc":  ["Xanh lá cây", "Xanh lục", "Xanh lá", "Xanh rêu"],
  "Hỏa":  ["Đỏ", "Hồng", "Tím", "Cam"],
  "Thổ":  ["Vàng đất", "Nâu đất", "Vàng", "Nâu"],
  "Kim":  ["Trắng", "Xám", "Ghi", "Ghi ánh kim"],
  "Thủy": ["Đen", "Xanh nước biển", "Xanh da trời", "Xanh nước"]
};

const TU_DIEN_MANG_MAU_DAI_KY = {
  "Mộc":  ["Trắng", "Xám", "Ghi"],                   // Kim khắc Mộc (Khớp cặp kỵ của Tốn/Chấn)
  "Hỏa":  ["Đen", "Xanh nước biển"],                // Thủy khắc Hỏa (Khớp cặp kỵ của Ly)
  "Thổ":  ["Xanh lá cây", "Xanh rêu", "Xanh lục"],   // Mộc khắc Thổ (Khớp cặp kỵ của Khôn/Cấn)
  "Kim":  ["Đỏ", "Hồng", "Tím", "Cam"],             // Hỏa khắc Kim (Khớp cặp kỵ của Đoài/Càn)
  "Thủy": ["Vàng đất", "Nâu đất", "Vàng"]            // Thổ khắc Thủy (Khớp cặp kỵ của Khảm)
};

// 1. NHÓM ĐẠI DIỆN HÀNH KIM
const MANG_HANH_KIM = [
  "Giáp Tý", "Ất Sửu", // Hải Trung Kim (Vàng trong biển)
  "Nhâm Thân", "Quý Dậu", // Kiếm Phong Kim (Vàng mũi kiếm)
  "Canh Thìn", "Tân Tỵ", // Bạch Lạp Kim (Vàng trong nến)
  "Giáp Ngọ", "Ất Mùi", // Sa Trung Kim (Vàng trong cát)
  "Nhâm Dần", "Quý Mão", // Kim Bạch Kim (Vàng thỏi)
  "Canh Tuất", "Tân Hợi", // Thoa Xuyến Kim (Vàng trang sức)
  "Bính Thân", "Đinh Dậu" // Sơn Hạ Kim (Vàng chân núi)
];

// 2. NHÓM ĐẠI DIỆN HÀNH MỘC
const MANG_HANH_MOC = [
  "Mậu Thìn", "Kỷ Tỵ", // Đại Lâm Mộc (Gỗ rừng già)
  "Nhâm Tý", "Quý Sửu", // Tang Đố Mộc (Gỗ cây dâu)
  "Canh Thân", "Tân Dậu", // Thạch Lựu Mộc (Gỗ cây lựu)
  "Mậu Tuất", "Kỷ Hợi", // Bình Địa Mộc (Cây đồng bằng)
  "Nhâm Ngọ", "Quý Mùi", // Dương Liễu Mộc (Gỗ cây liễu)
  "Canh Dần", "Tân Mão" // Tùng Bách Mộc (Gỗ cây tùng) - Đã khử lỗi Canh Nhiên cũ
];

// 3. NHÓM ĐẠI DIỆN HÀNH THỦY
const MANG_HANH_THUY = [
  "Bính Tý", "Đinh Sửu", // Giản Hạ Thủy (Nước mạch ngầm)
  "Giáp Thân", "Ất Dậu", // Tuyền Trung Thủy (Nước trong suối)
  "Nhâm Thìn", "Quý Tỵ", // Trường Lưu Thủy (Nước sông dài)
  "Bính Ngọ", "Đinh Mùi", // Thiên Hà Thủy (Nước mưa trên trời)
  "Giáp Dần", "Ất Mão", // Đại Khê Thủy (Nước khe lớn)
  "Nhâm Tuất", "Quý Hợi", // Đại Hải Thủy (Nước đại dương)
  "Mậu Thân", "Kỷ Dậu" // Đại Trạch Thủy (Nước đầm lầy)
];

// 4. NHÓM ĐẠI DIỆN HÀNH HỎA
const MANG_HANH_HOA = [
  "Bính Dần", "Đinh Mão", // Sơn Đầu Hỏa (Lửa đỉnh núi)
  "Giáp Tuất", "Ất Hợi", // Sơn Hạ Hỏa (Lửa chân núi)
  "Mậu Ngọ", "Kỷ Mùi", // Thiên Thượng Hỏa (Lửa mặt trời)
  "Bính Tuất", "Đinh Hợi", // Ốc Thượng Hỏa (Lửa trên mái nhà)
  "Giáp Thìn", "Ất Tỵ", // Phúc Đăng Hỏa (Lửa đèn dầu)
  "Mậu Tý", "Kỷ Sửu" // Tích Lịch Hỏa (Lửa sấm sét)
];

// 5. NHÓM ĐẠI DIỆN HÀNH THỔ
const MANG_HANH_THO = [
  "Canh Ngọ", "Tân Mùi", // Lộ Bàng Thổ (Đất bên đường)
  "Mậu Dần", "Kỷ Mão", // Thành Đầu Thổ (Đất thành trì)
  "Bính Tuất", "Đinh Hợi", // Ốc Thượng Thổ (Đất trên mái nhà)
  "Canh Tý", "Tân Sửu", // Bích Thượng Thổ (Đất trên tường thành)
  "Mậu Thân", "Kỷ Dậu", // Đại Trạch Thổ (Đất nền lớn)
  "Bính Thìn", "Đinh Tỵ" // Sa Trung Thổ (Đất pha cát)
];

const DICTIONARY_NAM_CA_NHAN = {
  1: {
    ten: "Năm Khởi Đầu & Gieo Hạt Mới",
    heQua: "Năng lượng bứt phá mạnh mẽ, mở ra chu kỳ 9 năm mới. Nhiều cơ hội, ý tưởng mới xuất hiện.",
    hanhDong: "Chủ động bước ra khỏi vùng an toàn, lập kế hoạch dài hạn, tự lực cánh sinh khởi công việc mới."
  },
  2: {
    ten: "Năm Hợp Tác, Hòa Bình & Trực Giác",
    heQua: "Tốc độ phát triển chậm lại, nhấn mạnh vào sự kết nối, các mối quan hệ và sự thấu hiểu nội tâm.",
    hanhDong: "Học cách lắng nghe, kiên nhẫn, xây dựng đồng minh, tránh xung đột trực tiếp và rèn luyện tâm thức."
  },
  3: {
    ten: "Năm Mở Rộng Kiến Thức & Sáng Tạo",
    heQua: "Năng lượng bùng nổ về trí tuệ, giao tiếp, học hỏi. Rất tốt cho việc khẳng định danh tiếng hoặc biểu đạt tài năng.",
    hanhDong: "Học tập nâng cao tay nghề, tích cực giao lưu, làm truyền thông, tránh nói lời thị phi, chủ quan."
  },
  4: {
    ten: "Năm Củng Cố Nền Tảng & Kỷ Luật (🔻 VÙNG TRŨNG 1)",
    heQua: "Trọng tâm rơi vào thực tế công việc, tài sản vật chất và sức khỏe. Đây là năm kiểm tra sức bền của bạn.",
    hanhDong: "Làm việc cẩn trọng, rà soát sổ sách pháp lý, chăm sóc sức khỏe, hạn chế đầu tư mạo hiểm, thắt chặt chi tiêu."
  },
  5: {
    ten: "Năm Tự Do, Thích Ứng & Dịch Chuyển",
    heQua: "Bứt phá khỏi khuôn mẫu cũ. Xu hướng đi lại, du lịch, thay đổi công việc hoặc môi trường sống diễn ra cao.",
    hanhDong: "Linh hoạt thích ứng, mở rộng vòng kết nối xã hội, đi công tác xa, giữ tâm lý vững vàng tránh sa đà vào cám dỗ."
  },
  6: {
    ten: "Năm Gia Đình, Tình Yêu & Trách Nhiệm",
    heQua: "Năng lượng hướng về tổ ấm, người thân, cống hiến vì cộng đồng và nâng cao năng lực sáng tạo.",
    hanhDong: "Dành thời gian hàn gắn các mối quan hệ gia đình, sửa sang nhà cửa, gánh vác trách nhiệm một cách bao dung."
  },
  7: {
    ten: "Năm Học Hỏi qua Trải Nghiệm & Thanh Lọc (🔻 VÙNG TRŨNG 2)",
    heQua: "Năm của sự đúc rút kinh nghiệm qua những bài học thử thách về tiền tài, sức khỏe hoặc lòng tin.",
    hanhDong: "Tuyệt đối hạn chế góp vốn lớn, tập trung nghiên cứu chuyên sâu, quay về bên trong, thiền định hoặc đi học nâng cao bản thân."
  },
  8: {
    ten: "Năm Độc Lập, Tài Chính & Gặt Hái Thành Quả",
    heQua: "Năm của sự thu hoạch quả ngọt sau những nỗ lực tích lũy. Cơ hội thăng tiến, quyền lực và tài chính khởi sắc rõ rệt.",
    hanhDong: "Quyết đoán ra quyết định kinh doanh lớn, quản lý tài chính chặt chẽ, khẳng định vị thế điều hành của bản thân."
  },
  9: {
    ten: "Năm Tổng Kết, Nhân Ái & Hoàn Thành Chu Kỳ",
    heQua: "Năm đóng lại các mối duyên cũ, công việc cũ không còn phù hợp để chuẩn bị dọn chỗ đón chu kỳ mới.",
    hanhDong: "Hoàn thiện dứt điểm các dự án dang dở, tha thứ, làm việc thiện nguyện, buông bỏ tiêu cực để tâm hồn nhẹ nhàng."
  }
};

const MA_TRAN_BAT_TU = {
  // --- TẦNG 1: THIÊN CAN VS THIÊN CAN ---
  canHop: {
    "Giáp": {
      hop: "Kỷ",
      hoa: "Thổ",
      yNghia: "Hợp hóa Thổ (Chủ về Trung Chính): Thể hiện sự khoan dung, chữ tín, trách nhiệm lớn."
    },
    "Ất": {
      hop: "Canh",
      hoa: "Kim",
      yNghia: "Hợp hóa Kim (Chủ về Nhân Nghĩa): Thể hiện sự quả cảm, cương trực, nghĩa khí."
    },
    "Bính": {
      hop: "Tân",
      hoa: "Thủy",
      yNghia: "Hợp hóa Thủy (Chủ về Uy Chế): Thể hiện sự mưu lược, thông tuệ nhưng dễ độc đoán."
    },
    "Đinh": {
      hop: "Nhâm",
      hoa: "Mộc",
      yNghia: "Hợp hóa Mộc (Chủ về Nhân Thọ): Thể hiện sự từ tâm, trắc ẩn, thọ mạng vững bền."
    },
    "Mậu": {
      hop: "Quý",
      hoa: "Hỏa",
      yNghia: "Hợp hóa Hỏa (Chủ về Tình Cảm): Thể hiện sự nhiệt huyết, thông minh, bộc trực."
    }
  },
  canXung: {
    "Giáp": {
      xung: "Canh",
      yNghia: "Giáp Canh tương xung: Kim Mộc chặt chẽ, tư tưởng dễ biến động, có sự bứt phá từ nghịch cảnh."
    },
    "Ất": {
      xung: "Tân",
      yNghia: "Ất Tân tương xung: Kim cắt cỏ mềm, dễ chịu tổn thương âm thầm, cần chú ý gân cốt."
    },
    "Bính": {
      xung: "Nhâm",
      yNghia: "Bính Nhâm tương xung: Thủy Hỏa chiến ngột, cuộc sống nhiều phen biến động lớn, thăng trầm nhanh."
    },
    "Đinh": {
      xung: "Quý",
      yNghia: "Đinh Quý tương xung: Sóng gió ngầm, tâm tư dễ lo âu, mâu thuẫn giữa lý trí và cảm xúc."
    }
  },
  canKhac: {
    "Giáp": {
      khac: "Mậu",
      yNghia: "Mộc khắc Thổ: Ý chí áp đặt lên hoàn cảnh thực tế."
    },
    "Ất": {
      khac: "Kỷ",
      yNghia: "Mộc khắc Thổ: Sự mềm mỏng dần dần kiểm soát đại cục."
    },
    "Bính": {
      khac: "Canh",
      yNghia: "Hỏa khắc Kim: Nhiệt huyết thiêu đốt sự cứng nhắc, phá vỡ luật lệ."
    },
    "Đinh": {
      khac: "Tân",
      yNghia: "Hỏa khắc Kim: Âm thầm mài giũa, rèn luyện sự tinh tế."
    },
    "Mậu": {
      khac: "Nhâm",
      yNghia: "Thổ khắc Thủy: Khả năng ngăn chặn sóng gió, tạo đê điều bảo vệ."
    },
    "Kỷ": {
      khac: "Quý",
      yNghia: "Thổ khắc Thủy: Thấm hút từ từ, kiểm soát cảm xúc ngầm."
    },
    "Canh": {
      khac: "Giáp",
      yNghia: "Kim khắc Mộc: Sự sắc bén, cắt tỉa những thứ rườm rà."
    },
    "Tân": {
      khac: "Ất",
      yNghia: "Kim khắc Mộc: Tổn thương âm thầm, tỉa tót chi tiết."
    },
    "Nhâm": {
      khac: "Bính",
      yNghia: "Thủy khắc Hỏa: Dập tắt bộc phát, áp chế bằng sự linh hoạt."
    },
    "Quý": {
      khac: "Đinh",
      yNghia: "Thủy khắc Hỏa: Trí tuệ tĩnh lặng kiểm soát sự nóng nảy."
    }
  },

  // --- TẦNG 2: ĐỊA CHI VS ĐỊA CHI ---
  chiLucHop: {
    "Tý": {
      hop: "Sửu",
      hoa: "Thổ",
      yNghia: "Tý Sửu lục hợp: Sự kết hợp bù trừ, biến động ngầm thành nền tảng vững chắc."
    },
    "Dần": {
      hop: "Hợi",
      hoa: "Mộc",
      yNghia: "Dần Hợi lục hợp: Mộc được Thủy sinh, quý nhân nâng đỡ, tài năng nảy nở."
    },
    "Mão": {
      hop: "Tuất",
      hoa: "Hỏa",
      yNghia: "Mão Tuất lục hợp: Lửa âm thầm nhen nhóm, chủ về sự đồng thuận, chung thủy."
    },
    "Thìn": {
      hop: "Dậu",
      hoa: "Kim",
      yNghia: "Thìn Dậu lục hợp: Thổ sinh Kim vượng, của cải tích lũy tốt, mưu sự dễ thành."
    },
    "Tỵ": {
      hop: "Thân",
      hoa: "Thủy",
      yNghia: "Tỵ Thân lục hợp (vừa hợp vừa hình): Cơ hội đi kèm thách thức, cần cẩn trọng pháp lý."
    },
    "Ngọ": {
      hop: "Mùi",
      hoa: "Thổ",
      yNghia: "Ngọ Mùi lục hợp: Nhật nguyệt đồng quang, quý nhân hiển lộ, danh khí nâng cao."
    }
  },
  chiLucXung: {
    "Tý": "Ngọ",
    "Sửu": "Mùi",
    "Dần": "Thân",
    "Mão": "Dậu",
    "Thìn": "Tuất",
    "Tỵ": "Hợi"
  },
  chiLucHai: {
    "Tý": "Mùi",
    "Sửu": "Ngọ",
    "Dần": "Tỵ",
    "Mão": "Thìn",
    "Thân": "Hợi",
    "Dậu": "Tuất"
  },
  chiTuongPha: {
    "Tý": "Dậu",
    "Mão": "Ngọ",
    "Dần": "Hợi",
    "Thân": "Tỵ",
    "Thìn": "Sửu",
    "Tuất": "Mùi"
  },
  chiTuHinh: ["Thìn", "Ngọ", "Dậu", "Hợi"],
  chiBanTamHop: [
    {
      chi: ["Thân", "Tý"],
      hoa: "Thủy",
      yNghia: "Tiền Bán Hợp Thủy: Bắt đầu tụ thủy, trí tuệ chớm nở."
    },
    {
      chi: ["Tý", "Thìn"],
      hoa: "Thủy",
      yNghia: "Hậu Bán Hợp Thủy: Thủy chảy về kho, tích lũy tri thức/tài sản."
    },
    {
      chi: ["Hợi", "Mão"],
      hoa: "Mộc",
      yNghia: "Tiền Bán Hợp Mộc: Sinh sôi nảy nở, cơ hội phát triển mạnh."
    },
    {
      chi: ["Mão", "Mùi"],
      hoa: "Mộc",
      yNghia: "Hậu Bán Hợp Mộc: Gặt hái thành quả, mộc nhập kho."
    },
    {
      chi: ["Dần", "Ngọ"],
      hoa: "Hỏa",
      yNghia: "Tiền Bán Hợp Hỏa: Nhiệt huyết bùng cháy, danh tiếng vang xa."
    },
    {
      chi: ["Ngọ", "Tuất"],
      hoa: "Hỏa",
      yNghia: "Hậu Bán Hợp Hỏa: Lửa giữ trong lò, ổn định danh vọng."
    },
    {
      chi: ["Tỵ", "Dậu"],
      hoa: "Kim",
      yNghia: "Tiền Bán Hợp Kim: Bắt đầu rèn luyện, kỷ luật nghiêm ngặt."
    },
    {
      chi: ["Dậu", "Sửu"],
      hoa: "Kim",
      yNghia: "Hậu Bán Hợp Kim: Kim nhập kho, cất giữ vàng bạc/tài sản."
    }
      ],
  chiTamHop: [
    {
      chi: ["Thân", "Tý", "Thìn"],
      hoa: "Thủy",
      yNghia: "Tam hợp Thủy cục (Chủ về Trí tuệ): Tư duy uyển chuyển, tầm nhìn xa rộng."
    },
    {
      chi: ["Hợi", "Mão", "Mùi"],
      hoa: "Mộc",
      yNghia: "Tam hợp Mộc cục (Chủ về Nhân đức): Tấm lòng trắc ẩn, tính hợp tác cao."
    },
    {
      chi: ["Dần", "Ngọ", "Tuất"],
      hoa: "Hỏa",
      yNghia: "Tam hợp Hỏa cục (Chủ về Lễ nghĩa): Nhiệt huyết, bùng nổ, có tài lãnh đạo."
    },
    {
      chi: ["Tỵ", "Dậu", "Sửu"],
      hoa: "Kim",
      yNghia: "Tam hợp Kim cục (Chủ về Nghĩa khí): Cương nghị, dứt khoát, quản lý tài chính sắc sảo."
    }
      ],
  chiTamHoi: [
    {
      chi: ["Dần", "Mão", "Thìn"],
      hoa: "Mộc",
      yNghia: "Tam hội Phương Đông: Mộc khí thuần khiết, sức sống mãnh liệt, chí hướng lớn."
    },
    {
      chi: ["Tỵ", "Ngọ", "Mùi"],
      hoa: "Hỏa",
      yNghia: "Tam hội Phương Nam: Hỏa khí ngùn ngụt, danh vọng lẫy lừng nhưng dễ nóng nảy."
    },
    {
      chi: ["Thân", "Dậu", "Tuất"],
      hoa: "Kim",
      yNghia: "Tam hội Phương Tây: Kim khí sát phạt, kỷ luật thép, uy quyền tối cao."
    },
    {
      chi: ["Hợi", "Tý", "Sửu"],
      hoa: "Thủy",
      yNghia: "Tam hội Phương Bắc: Thủy khí thâm sâu, tàng ẩn mưu lược, nội tâm vững vàng."
    }
      ],

  // --- TẦNG 3: THIÊN CAN DIỄN HOẠ TRÊN ĐỊA CHI ---
  chiTangCan: {
    "Tý": {
      chinh: "Quý"
    },
    "Sửu": {
      chinh: "Kỷ",
      trung: "Quý",
      du: "Tân"
    },
    "Dần": {
      chinh: "Giáp",
      trung: "Bính",
      du: "Mậu"
    },
    "Mão": {
      chinh: "Ất"
    },
    "Thìn": {
      chinh: "Mậu",
      trung: "Ất",
      du: "Quý"
    },
    "Tỵ": {
      chinh: "Bính",
      trung: "Canh",
      du: "Mậu"
    },
    "Ngọ": {
      chinh: "Đinh",
      trung: "Kỷ"
    },
    "Mùi": {
      chinh: "Kỷ",
      trung: "Đinh",
      du: "Ất"
    },
    "Thân": {
      chinh: "Canh",
      trung: "Nhâm",
      du: "Mậu"
    },
    "Dậu": {
      chinh: "Tân"
    },
    "Tuất": {
      chinh: "Mậu",
      trung: "Tân",
      du: "Đinh"
    },
    "Hợi": {
      chinh: "Nhâm",
      trung: "Giáp"
    }
  },
  chiToaDia: {
    "Sinh": "Can sinh Chi hoặc Chi sinh Can: Sự hỗ trợ qua lại giữa ý chí và nền tảng.",
    "Khắc": "Can khắc Chi hoặc Chi khắc Can: Nội tâm giằng co, hoàn cảnh không thuận theo ý muốn.",
    "Đồng": "Can Chi đồng hành: Tự tin, kiên định nhưng dễ bảo thủ."
  },
  chiNapAmNguHanh: {
    "Hải Trung Kim": "Vàng dưới biển - Tàng ẩn, nội tâm kín đáo, tài năng khó phát hiện ngay, cần thời gian và người khai phá.",
    "Lư Trung Hỏa": "Lửa trong lò - Ấm áp, nhiệt thành, có sức mạnh rèn giũa vạn vật nhưng cần nguồn động viên (củi) liên tục.",
    "Đại Lâm Mộc": "Gỗ rừng già - Vững chãi, bao dung, tính tình nhân ái, thích che chở người khác và hay ôm đồm nhiều việc.",
    "Lộ Bàng Thổ": "Đất ven đường - Hiền hòa, dễ gần, bao dung rộng lượng, sống được ở mọi môi trường nhưng dễ bị tác động.",
    "Kiếm Phong Kim": "Vàng mũi kiếm - Sắc bén, quyết đoán, cương liệt, mạnh mẽ, trực tính đến mức đôi khi làm tổn thương người khác.",
    "Sơn Đầu Hỏa": "Lửa trên núi - Rực rỡ, tỏa sáng, tác phong nhanh nhẹn, nhiệt tình nhưng bộc phát mạnh mẽ và chóng vánh.",
    "Giản Hạ Thủy": "Nước khe suối - Uyển chuyển, linh hoạt, khi tĩnh khi động, nội tâm sâu sắc khó đoán, thông minh khéo léo.",
    "Thành Đầu Thổ": "Đất trên thành - Vững chắc, bảo vệ nguyên tắc, trung thành, trọng chữ tín nhưng đôi lúc bảo thủ, cứng nhắc.",
    "Bạch Lạp Kim": "Vàng trong sáp - Đang trong quá trình rèn giũa, tinh khiết, linh hoạt nhưng chưa thực sự cứng cáp, cần thời gian trưởng thành.",
    "Dương Liễu Mộc": "Cây dương liễu - Mềm mỏng, uyển chuyển, dễ uốn nắn, giao tiếp tốt nhưng dễ thay đổi, gió chiều nào che chiều ấy.",
    "Tuyền Trung Thủy": "Nước trong suối - Thanh khiết, thâm trầm, cẩn trọng, hay giúp đỡ người khác một cách thầm lặng, không phô trương.",
    "Ốc Thượng Thổ": "Đất trên mái nhà - Đứng trên cao, tự lập, che chở bảo vệ gia đình, tính cách kiêu hãnh và có nguyên tắc riêng.",
    "Tích Lịch Hỏa": "Lửa sấm sét - Bùng nổ, vang dội, uy phong, phản ứng cực kỳ nhanh nhạy, tính cách mạnh mẽ nhưng hay nóng vội.",
    "Tùng Bách Mộc": "Cây tùng bách - Kiên cường, bất khuất, chịu đựng áp lực xuất sắc, sống thanh cao, độc lập và có ý chí sắt đá.",
    "Trường Lưu Thủy": "Nước sông dài - Không ngừng vận động, tầm nhìn xa rộng, nhiều tham vọng, thích sự do bay nhảy, ghét sự gò bó.",
    "Sa Trung Kim": "Vàng trong cát - Là người có tài ẩn giấu, cần mài giũa tìm kiếm, tính cách khiêm tốn nhưng cực kỳ kiên trì.",
    "Sơn Hạ Hỏa": "Lửa dưới núi - Ẩn tàng, hiền hòa, không phô trương nhưng khi cần thiết có thể bùng cháy mạnh mẽ, tính tình thực tế.",
    "Bình Địa Mộc": "Cây đồng bằng - Sinh trưởng dễ dàng, thân thiện, dễ thích nghi, cuộc sống thiên về sự bình yên, ôn hòa, hòa nhã.",
    "Bích Thượng Thổ": "Đất trên vách - Che mưa chắn gió, làm chỗ dựa vững chắc cho người khác, nhưng cần có người hỗ trợ mới phát huy hết tài năng.",
    "Kim Bạch Kim": "Vàng thỏi/Vàng khối - Thanh khiết, giá trị cao, tính cách cương trực, quả quyết, có khí chất vương giả, trọng nghĩa khí.",
    "Phúc Đăng Hỏa": "Lửa ngọn đèn - Soi sáng trong đêm, tinh tế, nhìn thấu sự việc, thường âm thầm cống hiến, tỏa sáng rực rỡ lúc khó khăn.",
    "Thiên Hà Thủy": "Nước trên trời/Mưa - Lan tỏa rộng khắp, tắm mát vạn vật, tinh thần bao la, bác ái, có tài lãnh đạo và sức ảnh hưởng lớn.",
    "Đại Trạch Thổ": "Đất cồn bãi - Linh hoạt, dễ thay đổi, lúc bồi lúc lở, tính tình phóng khoáng, tùy duyên, dễ hòa nhập cộng đồng.",
    "Thoa Xuyến Kim": "Vàng trang sức - Sang trọng, đẹp đẽ, thu hút sự chú ý, tính cách nhẹ nhàng, tinh tế, đôi khi mong manh cần nâng niu.",
    "Tang Đố Mộc": "Cây dâu tằm - Có ích cho đời, đa tài (lá nuôi tằm, thân làm mộc), hay lo bao đồng, cống hiến nhiều nhưng thường vất vả.",
    "Đại Khê Thủy": "Nước suối lớn - Năng lượng tuôn trào, nhiệt huyết, khao khát cái mới, không thích sự gò bó, tư duy đột phá, ào ạt.",
    "Sa Trung Thổ": "Đất pha cát - Mềm mỏng nhưng rời rạc, tính cách đôi khi thiếu quyết đoán, nhưng linh hoạt, sống được trong nhiều môi trường.",
    "Thiên Thượng Hỏa": "Lửa trên trời/Mặt trời - Ấm áp, quang minh chính đại, hào sảng, tỏa sáng rực rỡ, thích đứng đầu và dẫn dắt người khác.",
    "Thạch Lựu Mộc": "Cây lựu trên đá - Sức sống mãnh liệt, ngoan cường, dù hoàn cảnh khắc nghiệt vẫn đơm hoa kết trái, tính cách rắn rỏi, quật cường.",
    "Đại Hải Thủy": "Nước biển lớn - Mênh mông, sâu thẳm, chứa đựng muôn loài, tâm tư khó lường, ôm hoài bão lớn, bao dung nhưng cũng rất mạnh bạo."
  },
};


// ================= CaculateDate.gs =================
// Hàm tính dương lịch (Giữ nguyên logic chuẩn của bạn)
function tinhDuongLich(dataInput) {
  let d = parseInt(dataInput.ngay, 10);
  let m = parseInt(dataInput.thang, 10);
  let y = parseInt(dataInput.nam, 10);
  let h = parseInt(dataInput.gio, 10);
  let p = parseInt(dataInput.phut, 10);
  const viTriChon = dataInput.vitri;

  let phutLechThienVan = 0;
  let cacheGmt = 7;
  
  var vt = timViTri(viTriChon);   // khớp cả khi gõ "Hồ Chí Minh" không đủ chữ
  phutLechThienVan = vt.mins;
  cacheGmt = vt.gmt;

  p += phutLechThienVan;
  let gioThem = Math.floor(p / 60);
  p = (p % 60 + 60) % 60;
  h += gioThem;

  let ngayThem = Math.floor(h / 24);
  h = (h % 24 + 24) % 24;

  if (ngayThem !== 0) {
    let jdn = tinhJDNChuan(d, m, y) + ngayThem;
    let l = jdn + 68569;
    let n = Math.floor((4 * l) / 146097);
    l = l - Math.floor((146097 * n + 3) / 4);
    let i = Math.floor((4000 * (l + 1)) / 1461001);
    l = l - Math.floor((1461 * i) / 4) + 31;
    let j = Math.floor((80 * l) / 2447);
    d = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    m = j + 2 - 12 * l;
    y = 100 * (n - 49) + i + l;
  }

  const kyHieuGmt = cacheGmt >= 0 ? "+" + cacheGmt : cacheGmt;
  return {
    ngay: d,
    thang: m,
    nam: y,
    gio: h,
    phut: p,
    chuoiHienThi: `GMT ${kyHieuGmt} | ${h.toString().padStart(2, '0')}:${p.toString().padStart(2, '0')} - Ngày ${d} Tháng ${m} Năm ${y}`
  };
}

// Tính Âm lịch kèm theo tính Can Chi (Bát Tự)
function tinhAmLich(kqDuongLich) {
  var d = kqDuongLich.ngay;
  var m = kqDuongLich.thang;
  var y = kqDuongLich.nam;
  var gio = kqDuongLich.gio;
  
  // Tính Âm lịch dạng số
  var am = sangAmLich(d, m, y); 
  var jdn = tinhJDNChuan(d, m, y); // Lấy số JDN để tính can chi ngày chuẩn xác
  
  // A. Tính Can Chi Năm
  var canNamIdx = (am.year + 6) % 10;
  var chiNamIdx = (am.year + 8) % 12;
  var canChiNam = CANS[canNamIdx] + " " + CHIS[chiNamIdx];

  // B. Tính Can Chi Tháng (Tháng 1 Âm lịch luôn bắt đầu là tháng Dần)
  var canThangIdx = ((canNamIdx % 5) * 2 + am.month + 1) % 10;
  var chiThangIdx = (am.month + 1) % 12;
  var canChiThang = CANS[canThangIdx] + " " + CHIS[chiThangIdx];
  if (am.isLeap) canChiThang += " (Nhuận)";

  // C. Tính Can Chi Ngày (Dựa vào số ngày Julian để không bao giờ sai lệch)
  var canNgayIdx = (jdn + 9) % 10;
  var chiNgayIdx = (jdn + 1) % 12;
  var canChiNgay = CANS[canNgayIdx] + " " + CHIS[chiNgayIdx];

  // D. Tính Can Chi Giờ (Dựa vào Can của Ngày và Giờ hiện tại)
  var chiGioIdx = Math.floor((gio + 1) / 2) % 12; // 23h-1h là Tý (0), 1-3h là Sửu (1)...
  var canGioIdx = ((canNgayIdx % 5) * 2 + chiGioIdx) % 10;
  var canChiGio = CANS[canGioIdx] + " " + CHIS[chiGioIdx];

  return {
    ngay: am.day,
    thang: am.month,
    nam: am.year,
    isLeap: am.isLeap,
    canChiNgay: canChiNgay,
    canChiThang: canChiThang,
    canChiNam: canChiNam,
    canChiGio: canChiGio
  };
}

// Tính Dương lịch sang Âm Lịch
function sangAmLich(d, m, y) {
  var timeZone = 7; // Cố định GMT+7 để đồng bộ với Âm lịch VN
  var dayNumber = tinhJDNChuan(d, m, y);
  
  var k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  var menuDay = getNewMoonDay(k, timeZone);
  var nextMenuDay = getNewMoonDay(k + 1, timeZone);
  
  // Nếu ngày nhập đã rơi vào tháng sau, tăng k
  while (dayNumber < menuDay) {
    k--;
    nextMenuDay = menuDay;
    menuDay = getNewMoonDay(k, timeZone);
  }
  
  // Dò tiến nếu dayNumber quá lớn
  while (dayNumber >= nextMenuDay) {
    k++;
    menuDay = nextMenuDay;
    nextMenuDay = getNewMoonDay(k + 1, timeZone);
  }
  
  var a11 = getLunarMonth11(y, timeZone);
  var b11 = a11;
  if (a11 >= menuDay) {
    a11 = getLunarMonth11(y - 1, timeZone);
  } else {
    b11 = getLunarMonth11(y + 1, timeZone);
  }
  
  var lunarDay = dayNumber - menuDay + 1;
  var diff = Math.floor((menuDay - a11) / 29);
  var lunarMonth = diff + 11;
  var leapMonth, leap = false;
  
  if (b11 - a11 > 365) {
    leapMonth = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonth) {
      lunarMonth = diff + 10;
      if (diff === leapMonth) leap = true;
    }
  }
  
  if (lunarMonth > 12) lunarMonth -= 12;
  var lunarYear = y;
  if (lunarMonth >= 11 && diff < 4) lunarYear = y - 1;
  
  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap: leap
  };
}

// Tính Julian Day Number (JDN) chuẩn
function tinhJDNChuan(day, month, year) {
  var a = Math.floor((14 - month) / 12);
  var y = year + 4800 - a;
  var m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

// Hàm tính ngày Sóc (New Moon)
function getNewMoonDay(k, timeZone) {
  var T = k / 1236.85;
  var T2 = T * T;
  var T3 = T2 * T;
  var dr = Math.PI / 180;
  var Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  var m = 359.2242 * dr + 29.10535608 * dr * k;
  var mprime = 306.0253 * dr + 385.81691806 * dr * k;
  var f = 21.2964 * dr + 390.67050646 * dr * k;
  var dJd = (0.1734 - 0.000393 * T) * Math.sin(m) + 0.0021 * Math.sin(2 * m) - 0.4068 * Math.sin(mprime) + 0.0161 * Math.sin(2 * mprime) - 0.0004 * Math.sin(3 * mprime) + 0.0104 * Math.sin(2 * f) - 0.0051 * Math.sin(m + mprime) - 0.0074 * Math.sin(m - mprime) + 0.0004 * Math.sin(2 * f + m) - 0.0004 * Math.sin(2 * f - m) - 0.0006 * Math.sin(2 * f + mprime) + 0.001 * Math.sin(2 * f - mprime) + 0.0005 * Math.sin(m + 2 * mprime);
  
  // Hiệu chỉnh còn thiếu của thuật toán chuẩn (Hồ Ngọc Đức): số hạng 0.00033 và delta-T
  var corr = 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  var deltaT = (T < -11)
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return Math.floor(Jd1 + corr + dJd - deltaT + 0.5 + timeZone / 24);
}

// Kinh độ Mặt Trời (độ) tại 0h giờ địa phương của ngày Julian jdn
function getSunLongitudeDay(jdn, timeZone) {
  return kinhDoMatTroiJD(jdn - 0.5 - timeZone / 24);
}

// Ngày Sóc của tháng 11 Âm lịch (tháng chứa Đông Chí, Mặt Trời 270°)
function getLunarMonth11(yy, timeZone) {
  var off = tinhJDNChuan(31, 12, yy) - 2415021;
  var k = Math.floor(off / 29.530588853);
  var nm = getNewMoonDay(k, timeZone);
  var sunLong = Math.floor(getSunLongitudeDay(nm, timeZone) / 30);
  if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}

// Tháng nhuận = tháng đầu tiên KHÔNG chứa Trung Khí (Mặt Trời không sang cung 30° mới)
function getLeapMonthOffset(a11, timeZone) {
  var k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  var i = 1;
  var arc = Math.floor(getSunLongitudeDay(getNewMoonDay(k + i, timeZone), timeZone) / 30);
  var last;
  do {
    last = arc;
    i++;
    arc = Math.floor(getSunLongitudeDay(getNewMoonDay(k + i, timeZone), timeZone) / 30);
  } while (arc !== last && i < 14);
  return i - 1;
}

// Rút gọn số
function rutGonSo(num, isMainNumber = false) {
  if(isMainNumber && (num === 11 || num === 22 || num === 33)) return num;
  while(num > 9) {
    if(isMainNumber && (num === 11 || num === 22 || num === 33)) return num;
    let sum = 0;
    let s = num.toString();
    for(let i = 0; i < s.length; i++) sum += parseInt(s[i]);
    num = sum;
  }
  return num;
}
// Tính giá trị theo Thần số học
function tinhNamCaNhan(d, m, y) {
  let sum = 0;
  const sumDigits = (n) => {
    let s = 0;
    let num = parseInt(n);
    while(num > 0) {
      s += num % 10;
      num = Math.floor(num / 10);
    }
    return s;
  };
  sum = sumDigits(d) + sumDigits(m) + sumDigits(y);
  return rutGonSo(sum);
}

// ================= TuTru.gs =================
// =====================================================================
// TuTru.gs — Tính Tứ Trụ (Bát Tự) theo TIẾT KHÍ thiên văn + Khởi Đại Vận
// File mới. Thay cho cách tính theo tháng dương lịch trước đây
// (trước đây: Trụ Năm đổi vào 1/1, Trụ Tháng đổi vào mùng 1 dương lịch → sai
//  với mọi người sinh quanh Lập Xuân và quanh ngày 4-8 mỗi tháng).
// =====================================================================

// Kinh độ biểu kiến của Mặt Trời (độ, 0..360) tại thời điểm JD (UT)
function kinhDoMatTroiJD(jd) {
  var T = (jd - 2451545.0) / 36525.0, T2 = T * T, dr = Math.PI / 180;
  var L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
  var M = 357.52911 + 35999.05029 * T - 0.0001537 * T2;
  var C = (1.914602 - 0.004817 * T - 0.000014 * T2) * Math.sin(M * dr) +
          (0.019993 - 0.000101 * T) * Math.sin(2 * M * dr) +
          0.000289 * Math.sin(3 * M * dr);
  var omega = 125.04 - 1934.136 * T;
  var lon = L0 + C - 0.00569 - 0.00478 * Math.sin(omega * dr);
  lon = lon % 360;
  return lon < 0 ? lon + 360 : lon;
}

// Tra vị trí sinh: khớp chính xác → khớp không dấu ("Hồ Chí Minh" ra "TP. Hồ Chí Minh, Việt Nam")
function timViTri(ten) {
  var macDinh = { gmt: 7, mins: 0, key: "" };
  if (!ten) return macDinh;
  var raw = String(ten).trim();
  var tra = function (k) { return { gmt: DANH_SACH_VI_TRI[k].gmt, mins: DANH_SACH_VI_TRI[k].mins, key: k }; };
  if (DANH_SACH_VI_TRI[raw]) return tra(raw);
  var chuan = function (s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d")
      .replace(/\b(tp|thanh pho|tinh|viet nam)\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  };
  var can = chuan(raw);
  if (can.length < 3) return macDinh;
  var keys = Object.keys(DANH_SACH_VI_TRI), i;
  for (i = 0; i < keys.length; i++) if (chuan(keys[i]) === can) return tra(keys[i]);
  for (i = 0; i < keys.length; i++) { var k = chuan(keys[i]); if (k.indexOf(can) !== -1 || can.indexOf(k) !== -1) return tra(keys[i]); }
  return macDinh;
}

// Vĩ độ gần đúng (độ Bắc) của các tỉnh — dùng cho Cung Mọc
var VI_DO_TINH = {
  "Quảng Ninh":21.0,"Lạng Sơn":21.85,"Hải Phòng":20.85,"Cao Bằng":22.65,"Hải Dương":20.94,"Nam Định":20.42,"Thái Bình":20.45,
  "Bắc Giang":21.28,"Bắc Ninh":21.19,"Hà Nam":20.54,"Hưng Yên":20.65,"Hà Nội":21.03,"Bắc Kạn":22.15,"Thái Nguyên":21.59,
  "Ninh Bình":20.25,"Vĩnh Phúc":21.3,"Tuyên Quang":21.82,"Phú Thọ":21.32,"Hòa Bình":20.82,"Yên Bái":21.7,"Hà Giang":22.82,
  "Sơn La":21.33,"Lào Cai":22.48,"Lai Châu":22.4,"Điện Biên":21.39,"Bình Định":13.78,"Phú Yên":13.09,"Khánh Hòa":12.24,
  "Ninh Thuận":11.57,"Quảng Ngãi":15.12,"Đà Nẵng":16.05,"Quảng Nam":15.57,"Bình Thuận":10.93,"Lâm Đồng":11.94,"Kon Tum":14.35,
  "Gia Lai":13.98,"Đắk Lắk":12.67,"Thừa Thiên Huế":16.46,"Đắk Nông":12.0,"Quảng Trị":16.75,"Quảng Bình":17.47,"Thanh Hóa":19.81,
  "Hà Tĩnh":18.34,"Nghệ An":18.67,"Bà Rịa - Vũng Tàu":10.5,"Đồng Nai":10.95,"Bình Phước":11.75,"TP. Hồ Chí Minh":10.78,
  "Bình Dương":11.0,"Long An":10.54,"Bến Tre":10.24,"Tiền Giang":10.35,"Trà Vinh":9.93,"Tây Ninh":11.31,"Vĩnh Long":10.25,
  "Sóc Trăng":9.6,"Đồng Tháp":10.46,"Bạc Liêu":9.29,"Cần Thơ":10.03,"Hậu Giang":9.78,"An Giang":10.52,"Cà Mau":9.18,"Kiên Giang":10.01
};
function viDoTheoViTri(key) {
  var ten = String(key || "").replace(", Việt Nam", "");
  return VI_DO_TINH[ten] !== undefined ? VI_DO_TINH[ten] : 16.0;
}

// JD (UT) từ ngày-giờ đồng hồ địa phương
function jdUTTuNgayGio(ngay, thang, nam, gio, phut, gmt) {
  return tinhJDNChuan(ngay, thang, nam) - 0.5 + ((gio || 0) + (phut || 0) / 60) / 24 - (gmt === undefined ? 7 : gmt) / 24;
}

// Tứ Trụ theo Tiết Khí. Tham số: kq = kết quả tinhDuongLich() (đã bù kinh độ)
function tinhBatTuTietKhi(kq) {
  var jdn = tinhJDNChuan(kq.ngay, kq.thang, kq.nam);
  var jdUT = jdUTTuNgayGio(kq.ngay, kq.thang, kq.nam, kq.gio, kq.phut, 7);
  var lon = kinhDoMatTroiJD(jdUT);

  // Tháng Bát Tự: 12 Tiết, mỗi Tiết cách 30°; Lập Xuân = 315° mở tháng Dần
  var k = Math.floor((((lon - 315) % 360) + 360) % 360 / 30);   // 0 = Dần ... 11 = Sửu
  var chiThangIdx = (k + 2) % 12;

  // Năm Bát Tự đổi tại Lập Xuân, không phải 1/1 hay Tết
  var namBT = kq.nam;
  if (kq.thang <= 2 && lon >= 270 && lon < 315) namBT = kq.nam - 1;
  var canNamIdx = (((namBT - 4) % 10) + 10) % 10;
  var chiNamIdx = (((namBT - 4) % 12) + 12) % 12;

  // Ngũ Hổ độn: Giáp/Kỷ → Bính Dần, Ất/Canh → Mậu Dần, ...
  var canThangIdx = ((canNamIdx % 5) * 2 + 2 + k) % 10;

  var canNgayIdx = (jdn + 9) % 10, chiNgayIdx = (jdn + 1) % 12;

  var chiGioIdx = Math.floor(((kq.gio || 0) + 1) / 2) % 12;
  var canGioIdx = ((canNgayIdx % 5) * 2 + chiGioIdx) % 10;

  return {
    canNam: CANS[canNamIdx], chiNam: CHIS[chiNamIdx], canNamIdx: canNamIdx, chiNamIdx: chiNamIdx, namBatTu: namBT,
    canThang: CANS[canThangIdx], chiThang: CHIS[chiThangIdx], canThangIdx: canThangIdx, chiThangIdx: chiThangIdx,
    canNgay: CANS[canNgayIdx], chiNgay: CHIS[chiNgayIdx],
    canGio: CANS[canGioIdx], chiGio: CHIS[chiGioIdx],
    kinhDoMatTroi: Math.round(lon * 100) / 100
  };
}

// Khởi Đại Vận: dương nam / âm nữ đi thuận → đếm đến Tiết kế tiếp; ngược lại đếm về Tiết trước. 3 ngày = 1 tuổi.
function tinhKhoiVan(kq, canNamIdx, gioiTinh) {
  var duongNam = (canNamIdx % 2 === 0);
  var thuan = (duongNam && gioiTinh === "Nam") || (!duongNam && gioiTinh === "Nữ");
  var jd0 = jdUTTuNgayGio(kq.ngay, kq.thang, kq.nam, kq.gio, kq.phut, 7);
  var lon0 = kinhDoMatTroiJD(jd0);
  var viTri = Math.floor((lon0 - 15) / 30);
  var target = (((thuan ? viTri + 1 : viTri) * 30 + 15) % 360 + 360) % 360;
  var diff = function (jd) { var d = kinhDoMatTroiJD(jd) - target; return ((d + 540) % 360) - 180; };
  var step = thuan ? 0.25 : -0.25, a = jd0, da = diff(a), b = a, soNgay = 15;
  for (var i = 1; i <= 170; i++) {
    b = jd0 + step * i;
    var db = diff(b);
    if (da === 0) { soNgay = 0; break; }
    if ((da < 0 && db >= 0) || (da > 0 && db <= 0)) {
      var lo = Math.min(a, b), hi = Math.max(a, b), dlo = diff(lo);
      for (var j = 0; j < 40; j++) {
        var mid = (lo + hi) / 2, dm = diff(mid);
        if ((dlo < 0 && dm < 0) || (dlo > 0 && dm > 0)) { lo = mid; dlo = dm; } else { hi = mid; }
      }
      soNgay = Math.abs((lo + hi) / 2 - jd0);
      break;
    }
    a = b; da = db;
  }
  return { thuan: thuan, soNgay: Math.round(soNgay * 10) / 10, tuoi: Math.max(1, Math.min(10, Math.round(soNgay / 3))) };
}


// ================= OverView.gs =================
function tinhTongQuan(dataInput, gioiTinh, kqDuongLichIn, batTuIn) {
  // QUAN TRỌNG: HE_SO_NANG_LUONG là biến toàn cục (Data.gs) và bị cộng dồn trong hàm này.
  // Không reset thì mỗi lần gọi sau trên cùng một instance sẽ cộng chồng vào kết quả lần trước.
  HE_SO_NANG_LUONG = { "Mộc": 0, "Hỏa": 0, "Thổ": 0, "Kim": 0, "Thủy": 0 };

  // Dùng đúng trường 'vitri' mà giao diện gửi lên (trước đây đọc nhầm 'tinhThanh' → luôn lệch 0 phút)
  var thongTinViTri = timViTri(dataInput.vitri || dataInput.tinhThanh);
  var kqDuongLich = kqDuongLichIn || tinhDuongLich(dataInput);   // đã bù kinh độ + xử lý tràn ngày
  var batTu = batTuIn || tinhBatTuTietKhi(kqDuongLich);          // Tứ Trụ theo Tiết Khí
  var gioThucTe = kqDuongLich.gio;
  var phutThucTe = kqDuongLich.phut;

  var jd = tinhJDNChuan(kqDuongLich.ngay, kqDuongLich.thang, kqDuongLich.nam);

  var indexCanNgay = (jd + 9) % 10;
  if (indexCanNgay < 0) indexCanNgay += 10;

  var indexChiNgay = (jd + 1) % 12;
  if (indexChiNgay < 0) indexChiNgay += 12;

  var nhatChuCan = CANS[indexCanNgay];
  var nhatChuChi = CHIS[indexChiNgay];

  if (typeof nhatChuCan === "string") {
    nhatChuCan = nhatChuCan.trim(); // Lệnh này sẽ biến "Giáp " thành "Giáp" chuẩn 100%
  }
  if (typeof nhatChuChi === "string") {
    nhatChuChi = nhatChuChi.trim();
  }

  var nhatChu = nhatChuCan + " " + nhatChuChi;

  var menh = MAP_HANH_CAN[nhatChuCan];

  // Thông tin Nhật chủ và luận giải chi tiết
  var thongTinTheoMenh = MA_TRAN_TONG_HOP_NGU_HANH[menh];
  var chiTietNhatChu = thongTinTheoMenh.nhatChu[nhatChuCan];
  var chiTietTheoChi = chiTietNhatChu.bienTheChi[nhatChuChi];

  var titleThanVuongNhuoc; 
  var loiKhuyenNoiLuc;
  var dungThan;
  var hyThan;
  var iconHanh;
  var iconHy;
  var mauSacHop;
  var mauSacKy;
  var hanh = menh;
  var mDuong = kqDuongLich.thang;

  const tinhThapThanNoiBo = (hanhGoc, canHienTai, amDuongGoc, amDuongHienTai) => {
    if (!QUAN_HE_NGU_HANH[hanhGoc] || !QUAN_HE_NGU_HANH[hanhGoc][canHienTai]) return "Bình Hòa";
    return (amDuongGoc === amDuongHienTai) ? QUAN_HE_NGU_HANH[hanhGoc][canHienTai].cung : QUAN_HE_NGU_HANH[hanhGoc][canHienTai].khac;
  };

  const layHTMLDictionaryNoiBo = (tenThapThan, tangChu) => {
    let detail = MA_TRAN_THAP_THAN[tenThapThan];
    if (!detail) return "";
    return `
      <div style="background:#ffffff; border:1px solid #e2e8f0; padding:8px; border-radius:5px; margin-top:4px;">
        <span style="font-size:11px; font-weight:bold; color:#64748b; display:block; margin-bottom:2px;">📍 ${tangChu}: <b>${tenThapThan}</b></span>
        <b style="color:#1e293b; font-size:12px;">🌟 ${detail.tieuDe}:</b>
        <p style="margin:2px 0 4px 0; font-size:11.5px; color:#475569; line-height:1.4;">${detail.nghia}</p>
        <p style="margin:0; font-size:11.5px; color:#2563eb; font-weight:500; line-height:1.4;">👉 <b>Chiến lược:</b> <i>${detail.khuyen}</i></p>
      </div>
    `;
  };

  // Tứ Trụ lấy từ tinhBatTuTietKhi() (TuTru.gs): Năm đổi tại Lập Xuân, Tháng đổi theo 12 Tiết
  var canNamChuan = batTu.canNam, chiNamChuan = batTu.chiNam;
  var canThangChuan = batTu.canThang, chiThangChuan = batTu.chiThang;
  var canGioChuan = batTu.canGio, chiGioChuan = batTu.chiGio;

  // Khai báo cấu hình 4 trụ bằng chính các biến dữ liệu nội bộ của bạn
  const danhSachTuTru = [
    { id: "Nam", titleName: "Năm", can: canNamChuan, chi: chiNamChuan, valText: canNamChuan + " " + chiNamChuan, detText: "Trụ gốc rễ, tổ tiên, thời niên thiếu (0 - 16 tuổi)" },
    { id: "Thang", titleName: "Tháng", can: canThangChuan, chi: chiThangChuan, valText: canThangChuan + " " + chiThangChuan, detText: "Trụ sự nghiệp, cha mẹ, thời thanh niên (17 - 32 tuổi)" },
    { id: "Ngay", titleName: "Ngày", can: nhatChuCan, chi: nhatChuChi, valText: nhatChu, detText: "Bản mệnh cốt lõi, cái tôi nội tại, thời trung niên (33 - 48 tuổi)" },
    { id: "Gio", titleName: "Giờ", can: canGioChuan, chi: chiGioChuan, valText: canGioChuan + " " + chiGioChuan, detText: "Trụ con cái, thành quả, hậu vận (49 tuổi trở đi)" }
  ];

  // Map tự động xử lý Sinh Khắc, Thập thần tại gốc
  let tuTruChiTietHTML = danhSachTuTru.map(tru => {
    let isNhatChu = (tru.id === "Ngay");   // trước đây không gán → Trụ Ngày bị luận như trụ thường

    // Tra cứu trực tiếp từ các mảng dữ liệu hanhCuaCan, hanhCuaChi có sẵn của bạn
    let hCan = MAP_HANH_CAN[tru.can];
    let hChi = MAP_HANH_CHI[tru.chi];

    // 1. TẬN DỤNG ĐỂ TRA CỨU NẠP ÂM VÀ HÀNH CỐT LÕI TỪ BỘ TỪ ĐIỂN CỦA BẠN
    let chuoiCanChiKey = `${tru.can} ${tru.chi}`;
    let duLieuTraCuuNapAm = NAP_AM[chuoiCanChiKey];

    let napAmTru = duLieuTraCuuNapAm.y;
    let hanhCuaCaTru = duLieuTraCuuNapAm.m;

    // Nếu là Trụ Ngày (Nhật Chủ), gán đè Ngũ hành Nhật chủ gốc làm trung tâm
    if (isNhatChu) {
      hCan = menh;
      hChi = MAP_HANH_CHI[tru.chi];
    }

    // Tính toán bóc tách đơn Thập thần cho Can và Chi
    let adGoc = AM_DUONG_CAN[nhatChuCan];
    let adCan = AM_DUONG_CAN[tru.can];
    let adChi = AM_DUONG_CHI[tru.chi];

    // Tính Thập thần lấy nhatChuCan (Can Ngày) làm điểm tựa
    let realThapThanCan = isNhatChu ? "Nhật Chủ" : tinhThapThanNoiBo(menh, hCan, adGoc, adCan);
    let realThapThanChi = isNhatChu ? "Cung Phu Thê" : tinhThapThanNoiBo(menh, hChi, adGoc, adChi);

    let thapThanCanDisplay = isNhatChu ? `Nhật Chủ (Mệnh Gốc)` : realThapThanCan;
    let thapThanChiDisplay = isNhatChu ? `Cung Phu Thê (Hôn Nhân)` : realThapThanChi;

    // Tra cứu từ điển DictionaryThapThan để sinh cấu trúc HTML lời khuyên
    let luanGiaiCanHTML = layHTMLDictionaryNoiBo(realThapThanCan, "Can (Bề nổi / Xã hội)");
    let luanGiaiChiHTML = layHTMLDictionaryNoiBo(realThapThanChi, "Chi (Thực tế / Nội tâm)")

    // Xử lý logic Sinh Khắc nội tại giữa Can và Chi của Trụ
    let tag = "", desc = "", badgeColor = "", bgColor = "";
    if (hCan === hChi) {
      tag = "Đồng Hành (Bình Hòa)"; badgeColor = "#0284c7"; bgColor = "#f0f9ff"; 
      desc = isNhatChu ? "Vợ chồng như bạn bè, độc lập, tôn trọng nhau." : "Trụ cột vững vàng, nội lực mạnh mẽ, kiên định.";
    } else if (QUY_LUAT_SINH[hCan] === hChi) {
      tag = "Tương Sinh (🟢 Tốt)"; badgeColor = "#16a34a"; bgColor = "#f0fdf4"; 
      desc = isNhatChu ? "Bạn có xu hướng yêu chiều, chăm sóc cho đối phương." : "Năng lượng trơn tru, bề ngoài che chở cho bên trong.";
    } else if (QUY_LUAT_SINH[hChi] === hCan) {
      tag = "Tương Sinh (🟢 Tốt)"; badgeColor = "#16a34a"; bgColor = "#f0fdf4";
      desc = isNhatChu ? "Bạn được vợ/chồng hậu thuẫn, yêu thương hết mực." : "Nền tảng vững chắc thúc đẩy hình ảnh bề ngoài tỏa sáng.";
    } else if (QUY_LUAT_KHAC[hCan] === hChi) {
      tag = "Tương Khắc (🔴 Lưu ý)"; badgeColor = "#dc2626"; bgColor = "#fff5f5"; 
      desc = isNhatChu ? "Bạn có xu hướng kiểm soát, áp đặt đối phương." : "Bên ngoài muốn áp chế bên trong, dễ sinh bất mãn ngầm.";
    } else if (QUY_LUAT_KHAC[hChi] === hCan) {
      tag = "Tương Khắc (🔴 Lưu ý)"; badgeColor = "#dc2626"; bgColor = "#fff5f5";
      desc = isNhatChu ? "Vợ/chồng tạo áp lực, cả hai dễ khắc khẩu." : "Hoàn cảnh ngầm cản trở sự phát triển bề ngoài.";
    }

    return {
      cardId: `card${tru.id}`, valId: `val${tru.id}`, detId: `det${tru.id}`, eleId: `ele${tru.id}`, relId: `rel${tru.id}`,
      titleName: isNhatChu ? "Trụ Ngày (Chủ)" : `Trụ ${tru.titleName}`,
      bgTitle: isNhatChu ? "#cbd5e1" : "#e2e8f0",
      valueText: tru.valText, detailText: tru.detText, napAm: napAmTru, hanhCan: hCan, hanhChi: hChi,
      hanhTongQuatCuaTru: hanhCuaCaTru, thapThanCanDisplay, thapThanChiDisplay, luanGiaiCan: luanGiaiCanHTML, luanGiaiChi: luanGiaiChiHTML,
      tag, desc, badgeColor, bgColor
    };
  });

  let tuongTacCacTruMang = [];
  if (typeof kiemTraTuongTacToanDien === "function") {
    tuongTacCacTruMang = kiemTraTuongTacToanDien(
      canNamChuan, chiNamChuan, 
      canThangChuan, chiThangChuan, 
      nhatChuCan, nhatChuChi, 
      canGioChuan, chiGioChuan
    );
  }

  danhSachTuTru.forEach(tru => {
    let idTru = tru.id; 
    let heSoViTri = HE_SO_TRU[idTru];

    let canSach = String(tru.can).trim();
    let chiSach = String(tru.chi).trim();

    // BƯỚC A: THIÊN CAN LỘ DIỆN (Thiên Can đại diện bề nổi chiếm đúng 30% sức mạnh của Trụ đó)
    let hanhCanHienTai = MAP_HANH_CAN[canSach];
    if (HE_SO_NANG_LUONG[hanhCanHienTai] !== undefined) {
      HE_SO_NANG_LUONG[hanhCanHienTai] += 0.30 * heSoViTri;
    }

    // BƯỚC B: ĐỊA CHI TÀNG CAN ẨN SÂU (Địa Chi cắm rễ gốc đại diện cốt lõi chiếm đúng 70% sức mạnh Trụ)
    let daiTangKhiAn = MA_TRAN_DIA_CHI[chiSach];
    if (daiTangKhiAn && Array.isArray(daiTangKhiAn)) {
      daiTangKhiAn.forEach(phanTu => {
        if (HE_SO_NANG_LUONG[phanTu.h] !== undefined) {
          HE_SO_NANG_LUONG[phanTu.h] += 0.70 * phanTu.tl * heSoViTri;
        }
      });
    }
  });
  
  // Kích hoạt biến lượng động tương tác hình xung (Đếm tần suất xuất hiện chi thực tế)
  let cacChiList = danhSachTuTru.map(t => String(t.chi).trim());

  MA_TRAN_LUC_XUNG.forEach(cap => {
    if (cacChiList.includes(cap.c1) && cacChiList.includes(cap.c2)) {
      let count1 = cacChiList.filter(c => c === cap.c1).length;
      let count2 = cacChiList.filter(c => c === cap.c2).length;

      if (cap.loai === "Thổ_Xung_Vượng") {
        HE_SO_NANG_LUONG["Thổ"] *= 1.25; 
      } else {
        if (count2 > count1) {
          let tyLeSuyGiam = Math.max(0.2, 0.65 - (count2 * 0.1));
          HE_SO_NANG_LUONG[cap.hKhac] *= tyLeSuyGiam;  
          HE_SO_NANG_LUONG[cap.hBiKhac] *= 1.15;       
        } else {
          HE_SO_NANG_LUONG[cap.hBiKhac] *= 0.60;    
        }
      }
    }
  });

  // Kích hoạt tất cả các cặp Tự Hình phần cứng (Ngọ, Dậu, Thìn, Hợi) tự động theo quân số
  for (let chiHinh in MA_TRAN_TU_HINH) {
    let countHinh = cacChiList.filter(c => c === chiHinh).length;
    if (countHinh >= 2) {
      let loiThe = MA_TRAN_TU_HINH[chiHinh];
      HE_SO_NANG_LUONG[loiThe.h] *= loiThe.hs; // Tự động nhân hệ số vượng khí tăng cường
    }
  }

  // Tìm hành vượng nhất (chiếm thế thượng phong tối cao) của lá số hiện tại
  let hanhVuongNhat = "Hỏa";
  let maxDiemGoc = -1;
  for (let h in HE_SO_NANG_LUONG) {
    if (HE_SO_NANG_LUONG[h] > maxDiemGoc) {
      maxDiemGoc = HE_SO_NANG_LUONG[h];
      hanhVuongNhat = h;
    }
  }

  if (maxDiemGoc > 1.1) {
    
    let hanhBiTietKhi = Object.keys(QUY_LUAT_SINH).find(key => QUY_LUAT_SINH[key] === hanhVuongNhat);

    let hanhBiKhacDiet = QUY_LUAT_KHAC[hanhVuongNhat];

    if (hanhBiTietKhi && HE_SO_NANG_LUONG[hanhBiTietKhi] > 0) {
      let heSoTietDong = Math.max(0.55, 0.85 - (maxDiemGoc * 0.08));
      HE_SO_NANG_LUONG[hanhBiTietKhi] *= heSoTietDong; 
    }

    if (hanhBiKhacDiet && HE_SO_NANG_LUONG[hanhBiKhacDiet] > 0) {
      let heSoKhacDong = Math.max(0.35, 0.65 - (maxDiemGoc * 0.1));
      HE_SO_NANG_LUONG[hanhBiKhacDiet] *= heSoKhacDong;
    }

    if (hanhVuongNhat === "Hỏa" && HE_SO_NANG_LUONG["Thổ"] > 0) {
      HE_SO_NANG_LUONG["Thổ"] *= 0.45; 
    }
  }

  let tongToanBoDiemKhu = HE_SO_NANG_LUONG["Mộc"] + HE_SO_NANG_LUONG["Hỏa"] + HE_SO_NANG_LUONG["Thổ"] + HE_SO_NANG_LUONG["Kim"] + HE_SO_NANG_LUONG["Thủy"];
  if (tongToanBoDiemKhu === 0) tongToanBoDiemKhu = 100;

  const mangNguHanhChuan = ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"];
  let phanTramThoMang = mangNguHanhChuan.map(hanh => {
    let phanTram = (HE_SO_NANG_LUONG[hanh] / tongToanBoDiemKhu) * 100;
    return parseFloat(phanTram.toFixed(1)); // Giữ nguyên số lẻ mượt mà gối về cho Radar Chart vẽ
  });

  let tongSauLamTron = phanTramThoMang.reduce((a, b) => a + b, 0);
  let phanChenhLech = parseFloat((100 - tongSauLamTron).toFixed(1));
  if (phanChenhLech !== 0) {
    // Tìm vị trí của hành đang chiếm số điểm lớn nhất (Hành vượng nhất) trong lá số
    let viTriHanhVuongNhat = 0;
    let mocMax = -1;
    phanTramThoMang.forEach((diem, index) => {
      if (diem > mocMax) {
        mocMax = diem;
        viTriHanhVuongNhat = index;
      }
    });
    phanTramThoMang[viTriHanhVuongNhat] = parseFloat((phanTramThoMang[viTriHanhVuongNhat] + phanChenhLech).toFixed(1));
  }
  let phanTramNguHanhMang = phanTramThoMang;

  // Thứ tự mảng % từ biểu đồ: 0: Mộc, 1: Hỏa, 2: Thổ, 3: Kim, 4: Thủy
  let phanTramMoc  = phanTramNguHanhMang[0];
  let phanTramHoa  = phanTramNguHanhMang[1];
  let phanTramTho  = phanTramNguHanhMang[2];
  let phanTramKim  = phanTramNguHanhMang[3];
  let phanTramThuy = phanTramNguHanhMang[4];

  // Mùa xác định theo Chi của THÁNG BÁT TỰ (không phải tháng dương lịch)
  const isXuan = ["Dần", "Mão", "Thìn"].includes(String(batTu.chiThang));   // Mộc vượng
  const isHa   = ["Tỵ", "Ngọ", "Mùi"].includes(String(batTu.chiThang));     // Hỏa vượng
  const isThu  = ["Thân", "Dậu", "Tuất"].includes(String(batTu.chiThang));  // Kim vượng
  const isDong = ["Hợi", "Tý", "Sửu"].includes(String(batTu.chiThang));     // Thủy vượng

  // THUẬT TOÁN ĐẲNG CẤP: Sức mạnh của Thân = Điểm của hành Bản mệnh + Điểm của hành Ấn sinh ra nó
  let sucManhBanThe = 0;
  if (hanh === "Mộc")  { sucManhBanThe = phanTramMoc + phanTramThuy; }
  else if (hanh === "Hỏa") { sucManhBanThe = phanTramHoa + phanTramMoc;  }
  else if (hanh === "Thổ") { sucManhBanThe = phanTramTho + phanTramHoa;  }
  else if (hanh === "Kim")  { sucManhBanThe = phanTramKim + phanTramTho;  }
  else if (hanh === "Thủy") { sucManhBanThe = phanTramThuy + phanTramKim;  }

  // TỰ ĐỘNG KHÓA BIẾN isVuong: Quy chuẩn Tử Bình nếu tổng lực lượng Bản mệnh + Ấn >= 48% -> Thân Vượng
  var isVuong = (sucManhBanThe >= 48);

  // CHẠY MA TRẬN RẼ NHÁNH TỰ ĐỘNG (GIỮ NGUYÊN HOÀN TOÀN CẤU TRÚC LOGIC PHONG THỦY CỦA BẠN)
  if (isVuong) {
    titleThanVuongNhuoc = "Thân Vượng (Nội lực vững vàng)"; 
    loiKhuyenNoiLuc = "Bản mệnh vượng sắc, thích hợp gánh vác việc lớn, nên dùng chính tài quan để tiêu hao bớt năng lượng thặng dư.";

    if (hanh === "Mộc") {
      if (isDong) {
        dungThan = "Hỏa"; iconHanh = "🔥";
        mauSacHop = ["Đỏ", "Hồng", "Tím", "Cam"]; mauSacKy = ["Xanh lá cây", "Đen", "Xanh nước biển"];
      } else if (isXuan) {
        dungThan = "Kim"; iconHanh = "⚔️";
        mauSacHop = ["Trắng", "Xám", "Ghi", "Vàng", "Nâu đất"]; mauSacKy = ["Xanh lá cây", "Đỏ", "Hồng", "Tím"];
      } else {
        dungThan = "Hỏa"; iconHanh = "🔥";
        mauSacHop = ["Đỏ", "Hồng", "Tím", "Cam"]; mauSacKy = ["Xanh lá cây", "Đen", "Xanh nước biển"];
      }
      
    } else if (hanh === "Hỏa") {
      if (isHa) {
        dungThan = "Thủy"; iconHanh = "🌊";
        mauSacHop = ["Đen", "Xanh nước biển", "Trắng", "Xám"]; mauSacKy = ["Đỏ", "Hồng", "Tím", "Xanh lá cây"];
      } else {
        dungThan = "Thổ"; iconHanh = "⛰️";
        mauSacHop = ["Vàng đất", "Nâu đất", "Trắng", "Xám"]; mauSacKy = ["Đỏ", "Hồng", "Tím", "Xanh lá cây"];
      }
      
    } else if (hanh === "Thổ") {
      if (isHa || isXuan || isThu) {
        dungThan = "Kim"; iconHanh = "⚔️";
        mauSacHop = ["Trắng", "Xám", "Ghi", "Đen", "Xanh nước biển"]; mauSacKy = ["Vàng đất", "Nâu đất", "Đỏ", "Hồng"];
      } else {
        dungThan = "Hỏa"; iconHanh = "🔥";
        mauSacHop = ["Xanh lá cây", "Đỏ", "Hồng", "Tím", "Cam", "Vàng đất", "Nâu đất"]; mauSacKy = ["Đen", "Xanh nước biển", "Trắng", "Xám"];
      }
        
    } else if (hanh === "Kim") {
      if (isThu) {
        dungThan = "Thủy"; iconHanh = "🌊";
        mauSacHop = ["Đen", "Xanh nước biển", "Xanh lá cây"]; mauSacKy = ["Trắng", "Xám", "Vàng đất", "Nâu đất"];
      } else {
        dungThan = "Hỏa"; iconHanh = "🔥";
        mauSacHop = ["Đỏ", "Hồng", "Tím", "Cam"]; mauSacKy = ["Trắng", "Xám", "Ghi", "Vàng đất", "Nâu đất"];
      } 

    } else if (hanh === "Thủy") {
      if (isDong) {
        dungThan = "Hỏa"; iconHanh = "🔥";
        mauSacHop = ["Đỏ", "Hồng", "Tím", "Cam"]; mauSacKy = ["Đen", "Xanh nước biển", "Trắng", "Xám"];
      } else {
        dungThan = "Mộc"; iconHanh = "🌳";
        mauSacHop = ["Xanh lá cây", "Xanh lục", "Đỏ", "Hồng"]; mauSacKy = ["Đen", "Xanh nước biển", "Trắng", "Xám", "Ghi"];
      }
    }
    hyThan = QUY_LUAT_SINH[dungThan];

  } else {
    titleThanVuongNhuoc = "Thân Nhược (Khí lực nội tại cần bổ trợ)"; 
    loiKhuyenNoiLuc = "Khí lực bản thân có phần hao tổn, nên tích lũy tri thức, tìm quý nhân Ấn trợ lực và xây dựng đội nhóm cùng chí hướng.";

    if (hanh === "Mộc") {
      if (isDong) {
        dungThan = "Hỏa"; iconHanh = "🔥";
        mauSacHop = ["Đỏ", "Hồng", "Tím", "Cam"]; mauSacKy = ["Đen", "Xanh nước biển", "Trắng"];
      } else {
        dungThan = "Thủy"; iconHanh = "🌊";
        mauSacHop = ["Trắng", "Xám", "Ghi", "Đen", "Xanh nước biển"]; mauSacKy = ["Vàng đất", "Nâu đất", "Đỏ", "Hồng"];
      }
      
    } else if (hanh === "Hỏa") {
      dungThan = "Mộc"; iconHanh = "🌳";
      mauSacHop = ["Xanh lá cây", "Đỏ", "Hồng", "Tím"]; mauSacKy = ["Trắng", "Xám", "Đen", "Xanh nước biển"];
      
    } else if (hanh === "Thổ") {
      dungThan = "Hỏa"; iconHanh = "🔥";
      mauSacHop = ["Xanh lá cây", "Đỏ", "Hồng", "Tím", "Cam", "Vàng đất", "Nâu đất"]; mauSacKy = ["Đen", "Xanh nước biển", "Trắng", "Xám"];
      
    } else if (hanh === "Kim") {
      dungThan = "Thổ"; iconHanh = "⛰️";
      mauSacHop = ["Đỏ", "Hồng", "Tím", "Cam", "Vàng đất", "Nâu đất", "Trắng"]; mauSacKy = ["Xanh lá cây", "Xanh lục"];
      
    } else if (hanh === "Thủy") {
      if (isDong) {
        dungThan = "Hỏa"; iconHanh = "🔥";
        mauSacHop = ["Đỏ", "Hồng", "Tím", "Cam"]; mauSacKy = ["Đen", "Xanh nước biển", "Trắng", "Xám"];
      } else {
        dungThan = "Kim"; iconHanh = "⚔️";
        mauSacHop = ["Vàng đất", "Nâu đất", "Trắng", "Xám", "Ghi", "Đen", "Xanh nước biển"]; mauSacKy = ["Đỏ", "Hồng", "Tím", "Cam"];
      }
    }
    hyThan = hanh;
  }
  
  var ngheNghiepTheoHanh = thongTinTheoMenh.ngheNghiep.viTriCongViec;

  var ngheNghiep = chiTietNhatChu.ngheNghiep;

  var ngheNghiepGoiY = MA_TRAN_TONG_HOP_NGU_HANH[dungThan].ngheNghiep.viTriCongViec;
  var vanBanNgheNghiepBojTro = ngheNghiepGoiY.map(function(item) {
    return "<br>+ <b>" + item.nganh + "</b>: " + item.job.join(", ");
  }).join("");
  var txtNgheNghiepGoiY = vanBanNgheNghiepBojTro;

  let cauLuanGiaiBienChung = "";
  if (isVuong) {
    if (hanh === "Thổ" && dungThan === "Thủy") {
      cauLuanGiaiBienChung = `Mặc dù trên mặt chữ hành Thổ của bạn chiếm tỷ lệ rất thấp (4%), nhưng do bạn sinh vào mùa Hạ (Hỏa vượng chiếm 55%) lại gặp ma trận chi Ngọ/Tỵ liên tục sinh đỡ, khiến trường khí Thổ bản thể bị quá tải, thiêu đốt đến mức khô cằn (Hỏa đa Thổ tiếu). Lúc này, nạp thêm Thổ sẽ làm đất đai sa mạc hóa. Do đó, hệ thống ưu tiên sử dụng <b>Hành THỦY</b> làm Dụng thần tối cao để tưới mát bản mệnh, khơi thông tài lộc.`;
    } else {
      cauLuanGiaiBienChung = `Do bản mệnh thuộc trạng thái Thân Vượng, năng lượng nội tại dư thừa, hệ thống ưu tiên lựa chọn Dụng Thần mang tính chất tiết chế, xả bớt khí thặng dư để đưa cơ thể về trạng thái cân bằng lý tưởng nhất.`;
    }
  } else {
    cauLuanGiaiBienChung = `Do khí lực nội tại có phần hao tổn, bản mệnh cần ưu tiên sử dụng các hành mang tính chất sinh trợ (Ấn) hoặc đồng hành trực tiếp để bổ trợ khuyết nhược, giúp bản thể vững vàng gánh vác tài quan.`;
  }

  const MAP_ICON_HY_THAN = { "Mộc": "🌳", "Hỏa": "🔥", "Thổ": "⛰️", "Kim": "⚔️", "Thủy": "🌊" };
  iconHy = MAP_ICON_HY_THAN[hyThan];

  let moTaLuanDungThanChu = `
    <div style="line-height: 1.6; color: #334155; font-size: 13.5px;">
      Lá số Tứ Trụ hiện tại đang ở trạng thái <b>${titleThanVuongNhuoc}</b>.<br>
      🧬 <b>Biện chứng thuật số:</b> ${cauLuanGiaiBienChung}<br>
      <div style="margin-top: 10px; background: #f0fdf4; border: 1px solid #16a34a40; padding: 10px; border-radius: 6px; text-align: center;">
        🎯 <b>DỤNG THẦN CHIẾN LƯỢC CẢI VẬN:</b> Hành <span style="color: #2563eb; font-weight: bold; font-size: 14px;">${dungThan.toUpperCase()} ${iconHanh}</span> | 
        ☀️ <b>HỶ THẦN TRỢ LỰC CẢI VẬN:</b> Hành <span style="color: #2563eb; font-weight: bold; font-size: 14px;">${hyThan.toUpperCase()} ${iconHy}</span>
      </div>
    </div>
  `;

  let dL_VatPham = (typeof TU_DIEN_VAT_PHAM !== "undefined" && TU_DIEN_VAT_PHAM[dungThan]) 
    ? TU_DIEN_VAT_PHAM[dungThan] 
    : { v: "Giữ tâm định tĩnh, cân bằng năng lượng.", k: "Hình khối tự nhiên" };

  return {
    gioThucTeDiaPhuong: `${gioThucTe.toString().padStart(2, '0')} giờ ${phutThucTe.toString().padStart(2, '0')} phút (Lệch ${thongTinViTri.mins} phút)`,
    nhatChu: nhatChu,
    nguHanh: hanh,
    tieuDe: thongTinTheoMenh.thuocTinh.tieuDe,
    tongQuan: thongTinTheoMenh.thuocTinh.tongQuan,
    uu: thongTinTheoMenh.thuocTinh.uu,
    nhuoc: thongTinTheoMenh.thuocTinh.nhuoc,
    nhanDien: thongTinTheoMenh.thuocTinh.nhanDien,

    dacTinhNgheNghiep: thongTinTheoMenh.ngheNghiep.dacTinh,
    ngheNghiepGoiY: txtNgheNghiepGoiY,
    ngheNghiepTheoHanh: ngheNghiepTheoHanh,

    tinhChat: chiTietNhatChu.tinhChat,
    hinhTuong: chiTietNhatChu.hinhTuong,
    tinhCachUuDiem: chiTietNhatChu.tinhCachUuDiem,
    tinhCachNhuocDiem: chiTietNhatChu.tinhCachNhuocDiem,
    ngheNghiep: ngheNghiep,
    loiKhuyenCaiVan: chiTietNhatChu.loiKhuyenCaiVan,

    napAm: chiTietTheoChi.napAm,
    tuongTac: chiTietTheoChi.tuongTac,
    luanGiai: chiTietTheoChi.luanGiai,
    luanGiaiNam: chiTietTheoChi.luanGiaiNam,
    luanGiaiNu: chiTietTheoChi.luanGiaiNu,

    ketQuaThanVuongNhuoc: titleThanVuongNhuoc,
    loiKhuyenNoiLuc: loiKhuyenNoiLuc,
    dungThan: dungThan,
    iconHanh: iconHanh,
    hyThan: hyThan,
    iconHy: iconHy,
    mauSacHop: mauSacHop,
    mauSacKy: mauSacKy,

    tuTruChiTietHTML: tuTruChiTietHTML,
    tuongTacCacTru: tuongTacCacTruMang,
    moTaLuanDungThanChu: moTaLuanDungThanChu,
    phanTramNguHanhMang: phanTramNguHanhMang,

    vatPhamBoTroText: dL_VatPham.v,
    dacTrungCauTrucText: dL_VatPham.k,


  };
}

function kiemTraThanVuong(nguHanhNhatChu, thangDuong) {
  // Quy ước mùa sinh tương đối theo tháng Dương lịch:
  // Thang 2,3,4: Mùa Xuân (Mộc vượng)  | Thang 5,6,7: Mùa Hạ (Hỏa vượng)
  // Thang 8,9,10: Mùa Thu (Kim vượng) | Thang 11,12,1: Mùa Đông (Thủy vượng)
  
  if (nguHanhNhatChu === "Mộc" && (thangDuong >= 2 && thangDuong <= 4)) return true;
  if (nguHanhNhatChu === "Hỏa" && (thangDuong >= 5 && thangDuong <= 7)) return true;
  if (nguHanhNhatChu === "Kim" && (thangDuong >= 8 && thangDuong <= 10)) return true;
  if (nguHanhNhatChu === "Thủy" && (thangDuong === 11 || thangDuong === 12 || thangDuong === 1)) return true;
  
  // Hành Thổ vượng vào các tháng cuối mùa (tháng 4, 7, 10, 1) hoặc được Hỏa sinh vào mùa hạ
  if (nguHanhNhatChu === "Thổ" && (thangDuong === 4 || thangDuong === 7 || thangDuong === 10 || thangDuong === 1 || (thangDuong >= 5 && thangDuong <= 6))) return true;

  return false; // Các trường hợp còn lại là lỗi mùa sinh -> Thân Nhược
}

function kiemTraTuongTacToanDien(canNam, chiNam, canThang, chiThang, canNgay, chiNgay, canGio, chiGio) {
    let cacCan = [
        { val: canNam, pos: "Năm" }, { val: canThang, pos: "Tháng" },
        { val: canNgay, pos: "Ngày" }, { val: canGio, pos: "Giờ" }
    ];
    let cacChi = [
        { val: chiNam, pos: "Năm" }, { val: chiThang, pos: "Tháng" },
        { val: chiNgay, pos: "Ngày" }, { val: chiGio, pos: "Giờ" }
    ];
    let chiList = [chiNam, chiThang, chiNgay, chiGio];

    let mapKetQua = new Map();

    function addKetQua(type, title, desc, bg, border, icon, posStr) {
        let key = type + "_" + title; 
        if (!mapKetQua.has(key)) {
            mapKetQua.set(key, { title: title, desc: desc, bg: bg, border: border, icon: icon, positions: posStr ? [posStr] : [] });
        } else if (posStr) {
            mapKetQua.get(key).positions.push(posStr);
        }
    }

    // ==========================================
    // 1. TẦNG 1: THIÊN CAN (Hợp, Xung, Khắc)
    // ==========================================
    for (let i = 0; i < cacCan.length - 1; i++) {
        for (let j = i + 1; j < cacCan.length; j++) {
            let c1 = cacCan[i].val; let p1 = cacCan[i].pos;
            let c2 = cacCan[j].val; let p2 = cacCan[j].pos;
            let posStr = `${p1}-${p2}`;

            if (MA_TRAN_BAT_TU.canHop[c1] && MA_TRAN_BAT_TU.canHop[c1].hop === c2) {
                addKetQua("CanHop", `Thiên Can Hợp (${c1} - ${c2})`, MA_TRAN_BAT_TU.canHop[c1].yNghia, "#f0fdf4", "#16a34a", "🤝", posStr);
            } else if (MA_TRAN_BAT_TU.canHop[c2] && MA_TRAN_BAT_TU.canHop[c2].hop === c1) {
                addKetQua("CanHop", `Thiên Can Hợp (${c2} - ${c1})`, MA_TRAN_BAT_TU.canHop[c2].yNghia, "#f0fdf4", "#16a34a", "🤝", posStr);
            }

            if (MA_TRAN_BAT_TU.canXung[c1] && MA_TRAN_BAT_TU.canXung[c1].xung === c2) {
                addKetQua("CanXung", `Thiên Can Xung (${c1} - ${c2})`, MA_TRAN_BAT_TU.canXung[c1].yNghia, "#fff5f5", "#ef4444", "⚔️", posStr);
            } else if (MA_TRAN_BAT_TU.canXung[c2] && MA_TRAN_BAT_TU.canXung[c2].xung === c1) {
                addKetQua("CanXung", `Thiên Can Xung (${c2} - ${c1})`, MA_TRAN_BAT_TU.canXung[c2].yNghia, "#fff5f5", "#ef4444", "⚔️", posStr);
            }

            if (MA_TRAN_BAT_TU.canKhac[c1] && MA_TRAN_BAT_TU.canKhac[c1].khac === c2) {
                addKetQua("CanKhac", `Thiên Can Khắc (${c1} khắc ${c2})`, MA_TRAN_BAT_TU.canKhac[c1].yNghia, "#fffbeb", "#f59e0b", "⚡", posStr);
            } else if (MA_TRAN_BAT_TU.canKhac[c2] && MA_TRAN_BAT_TU.canKhac[c2].khac === c1) {
                addKetQua("CanKhac", `Thiên Can Khắc (${c2} khắc ${c1})`, MA_TRAN_BAT_TU.canKhac[c2].yNghia, "#fffbeb", "#f59e0b", "⚡", posStr);
            }
        }
    }

    // ==========================================
    // 2. TẦNG 2: ĐỊA CHI (Hội, Hợp, Xung, Hại, Phá, Hình)
    // ==========================================
    let foundTamHoiHop = false;
    
    MA_TRAN_BAT_TU.chiTamHoi.forEach(th => {
        if (th.chi.every(c => chiList.includes(c))) {
            addKetQua("TamHoi", `Tam Hội Phương (${th.chi.join("-")})`, th.yNghia, "#f5f3ff", "#8b5cf6", "🔥", "Cục diện Toàn Lá Số");
            foundTamHoiHop = true;
        }
    });
    
    MA_TRAN_BAT_TU.chiTamHop.forEach(th => {
        if (th.chi.every(c => chiList.includes(c))) {
            addKetQua("TamHop", `Tam Hợp Cục (${th.chi.join("-")})`, th.yNghia, "#eff6ff", "#3b82f6", "🌊", "Cục diện Toàn Lá Số");
            foundTamHoiHop = true;
        }
    });

    for (let i = 0; i < cacChi.length - 1; i++) {
        for (let j = i + 1; j < cacChi.length; j++) {
            let c1 = cacChi[i].val; let p1 = cacChi[i].pos;
            let c2 = cacChi[j].val; let p2 = cacChi[j].pos;
            let posStr = `${p1}-${p2}`;

            if (c1 === c2) {
                if (MA_TRAN_BAT_TU.chiTuHinh.includes(c1)) {
                    addKetQua("TuHinh", `Tự Hình (${c1}-${c2})`, `Có xu hướng tự gây rắc rối, nội tâm dằn vặt, suy nghĩ luẩn quẩn.`, "#fdf4ff", "#c026d3", "🔄", posStr);
                } else {
                    addKetQua("PhucNgam", `Phục Ngâm (${c1}-${c2})`, `Hai địa chi giống nhau xuất hiện đồng thời gây ứ đọng dòng khí, dễ sinh bế tắc, trì trệ tạm thời.`, "#f1f5f9", "#64748b", "⏳", posStr);
                }
                continue; 
            }

            if (MA_TRAN_BAT_TU.chiLucHop[c1] && MA_TRAN_BAT_TU.chiLucHop[c1].hop === c2) {
                addKetQua("LucHop", `Lục Hợp (${c1}-${c2})`, MA_TRAN_BAT_TU.chiLucHop[c1].yNghia, "#ecfdf5", "#059669", "🔗", posStr);
            } else if (MA_TRAN_BAT_TU.chiLucHop[c2] && MA_TRAN_BAT_TU.chiLucHop[c2].hop === c1) {
                addKetQua("LucHop", `Lục Hợp (${c2}-${c1})`, MA_TRAN_BAT_TU.chiLucHop[c2].yNghia, "#ecfdf5", "#059669", "🔗", posStr);
            }

            if (MA_TRAN_BAT_TU.chiLucXung[c1] === c2 || MA_TRAN_BAT_TU.chiLucXung[c2] === c1) {
                addKetQua("LucXung", `Lục Xung (${c1}-${c2})`, `Xung đột, va chạm trực tiếp gây biến động lớn giữa hai trụ.`, "#fef2f2", "#dc2626", "💥", posStr);
            }

            if (MA_TRAN_BAT_TU.chiLucHai[c1] === c2 || MA_TRAN_BAT_TU.chiLucHai[c2] === c1) {
                addKetQua("LucHai", `Lục Hại (${c1}-${c2})`, `Dễ xảy ra hiểu lầm ngầm, làm ơn mắc oán, đố kỵ lẫn nhau.`, "#fff7ed", "#ea580c", "💔", posStr);
            }
            
            if (MA_TRAN_BAT_TU.chiTuongPha[c1] === c2 || MA_TRAN_BAT_TU.chiTuongPha[c2] === c1) {
                addKetQua("TuongPha", `Tương Phá (${c1}-${c2})`, `Sự phá vỡ cấu trúc, rạn nứt ngầm từ bên trong hoàn cảnh.`, "#f8fafc", "#64748b", "✂️", posStr);
            }

            if (!foundTamHoiHop) {
                MA_TRAN_BAT_TU.chiBanTamHop.forEach(bth => {
                    if (bth.chi.includes(c1) && bth.chi.includes(c2)) {
                        addKetQua("BanHop", `Bán Tam Hợp (${c1}-${c2})`, bth.yNghia, "#f0f9ff", "#0284c7", "📎", posStr);
                    }
                });
            }
        }
    }

    // ==========================================
    // 3. TẦNG 3: GIAO THOA CAN CHI (Thông căn, Tọa Địa)
    // ==========================================
    let reCan = [];
    chiList.forEach((chi, index) => {
        let tc = MA_TRAN_BAT_TU.chiTangCan[chi];
        if (tc && (tc.chinh === canNgay || tc.trung === canNgay || tc.du === canNgay)) {
            reCan.push(cacChi[index].pos);
        }
    });

    // VÁ LỖI CẮT CHỮ: Hoàn thiện nhánh dòng lệnh logic Thông Căn an toàn
    if (reCan.length > 0) {
        let uniqueRe = [...new Set(reCan)].join(", ");
        addKetQua("ThongCan", `Thiên Can Có Rễ (Thông Căn)`, `Nhật chủ ${canNgay} cắm rễ vững chắc tại trụ ${uniqueRe}. Là người thực tế, "nói đi đôi với làm", ý chí được hoàn cảnh hậu thuẫn.`, "#ecfdf5", "#059669", "🌳", "");
    } else {
        addKetQua("ThongCan", `Thiên Can Phù Diếm (Trôi Nổi)`, `Nhật chủ ${canNgay} không có rễ ẩn trong Địa Chi. Nội tâm dễ bị lung lay, ý chí bay bổng thiếu thực tế, cần nương tựa quý nhân bồi đắp nền tảng.`, "#f8fafc", "#64748b", "☁️", "");
    }

    // SỬA ĐỔI CỐT LÕI: Chuyển đổi toàn bộ Map sang một Mảng phẳng JSON nguyên khối gửi về Client
    let danhSachKetQuaPhang = [];
    mapKetQua.forEach((val) => {
        danhSachKetQuaPhang.push({
            title: val.title,
            desc: val.desc,
            bg: val.bg,
            border: val.border,
            icon: val.icon,
            positions: val.positions.filter(p => p !== "").join(", ")
        });
    });

    return danhSachKetQuaPhang;
}

function danhGiaThanVuongNhuoc(hanhNhatChu, phanTramNguHanhMang) {
    // 1. Quy luật Ngũ hành chuẩn Bát Tự
    const TUONG_SINH = { "Kim": "Thổ", "Thủy": "Kim", "Mộc": "Thủy", "Hỏa": "Mộc", "Thổ": "Hỏa" }; 
    const TIEU_HAO = { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" };  
    const KHAC_DO_ANG = { "Kim": "Hỏa", "Thủy": "Thổ", "Mộc": "Kim", "Hỏa": "Thủy", "Thổ": "Mộc" }; 
    const BI_KHAC = { "Kim": "Mộc", "Thủy": "Hỏa", "Mộc": "Thổ", "Hỏa": "Kim", "Thổ": "Thủy" };    

    const hanhSinhToi = TUONG_SINH[hanhNhatChu]; 
    const hanhTietKhi = TIEU_HAO[hanhNhatChu];   
    const hanhKhacToi = KHAC_DO_ANG[hanhNhatChu]; 
    const hanhBiKhac = BI_KHAC[hanhNhatChu];     

    // 2. Chuyển mảng phẳng thành Đối tượng Map để dễ gọi theo tên Hành
    // Thứ tự mảng của bạn: 0: Mộc, 1: Hỏa, 2: Thổ, 3: Kim, 4: Thủy
    const phanTramMap = {
        "Mộc": phanTramNguHanhMang[0] || 0,
        "Hỏa": phanTramNguHanhMang[1] || 0,
        "Thổ": phanTramNguHanhMang[2] || 0,
        "Kim": phanTramNguHanhMang[3] || 0,
        "Thủy": phanTramNguHanhMang[4] || 0
    };

    // 3. Phân chia lực lượng cán cân theo % thực tế
    let phanTramSinhVaCung = phanTramMap[hanhNhatChu] + phanTramMap[hanhSinhToi];
    let phanTramKhacVaHao = 100 - phanTramSinhVaCung;

    // Giữ nguyên biên độ lệch 4% làm chuẩn cân bằng cho hệ phần trăm
    let trangThai = "TRUNG HÒA";
    if (phanTramSinhVaCung > phanTramKhacVaHao + 4) trangThai = "THÂN VƯỢNG";
    if (phanTramSinhVaCung < phanTramKhacVaHao - 4) trangThai = "THÂN NHƯỢC";

    let giaiThich = "";
    let phanTichSau = "";
    let dungThan = "";
    let hyThan = "";

    // 4. Thuật toán tìm Dụng Thần - Hỷ Thần dựa trên tỷ lệ % đã chuẩn hóa
    if (trangThai === "THÂN VƯỢNG") {
        if (phanTramMap[hanhTietKhi] >= phanTramMap[hanhKhacToi]) {
            dungThan = hanhTietKhi;
            hyThan = hanhBiKhac;
            giaiThich = `Bạn thuộc mẫu số <b>Thân Vượng</b>. Nội lực bản mệnh vững chãi nhưng dòng khí tích tụ quá lớn dễ sinh ra u uất, bế tắc. Khúc thức này chọn hành <b>${dungThan} (Thực Thương)</b> làm <b>Dụng Thần (Van xả áp suất)</b> để chủ động khơi thông dòng chảy trí tuệ, bung tỏa sức sáng tạo. <b>Hỷ Thần</b> song hành là hành <b>${hyThan} (Tài Tinh)</b> để biến năng lượng xả ra thành của cải vật chất.`;
        } else {
            dungThan = hanhKhacToi;
            hyThan = hanhBiKhac;
            giaiThich = `Bạn thuộc mẫu số <b>Thân Vượng</b>. Bản mệnh dồi dào, cần dùng thế lực mạnh mẽ để rèn giũa. Lá số chọn hành <b>${dungThan} (Quan Sát)</b> làm <b>Dụng Thần (Khung kỷ luật)</b> để tôi luyện ý chí, đưa cuộc đời vào khuôn khổ đại sự. <b>Hỷ Thần</b> là hành <b>${hyThan} (Tài Tinh)</b> đứng sau bơm tài chính, tiếp thêm quyền uy cho Dụng Thần.`;
        }
        
        phanTichSau = `
          <b style="color:#15803d;">🟢 Phe Ta / Trợ Lực độc tôn (${phanTramSinhVaCung.toFixed(1)}%):</b> <br>
          <span style="font-size:12.5px; color:#475569; padding-left: 20px; display:block;">
            • Bản mệnh (<b>${hanhNhatChu}</b>): ${phanTramMap[hanhNhatChu]}% <br>
            • Hậu phương tương sinh (<b>${hanhSinhToi}</b>): ${phanTramMap[hanhSinhToi]}%
          </span>
          <b style="color:#b91c1c; margin-top: 8px; display:block;">🔴 Phe Địch / Tiêu Hao thất thế (${phanTramKhacVaHao.toFixed(1)}%):</b> <br>
          <span style="font-size:12.5px; color:#475569; padding-left: 20px; display:block;">
            • Van xả tiết khí (<b>${hanhTietKhi}</b>): ${phanTramMap[hanhTietKhi]}% | 
            • Áp lực kìm hãm (<b>${hanhKhacToi}</b>): ${phanTramMap[hanhKhacToi]}% | 
            • Tiêu hao gánh vác (<b>${hanhBiKhac}</b>): ${phanTramMap[hanhBiKhac]}%
          </span>
        `;
    
    } else if (trangThai === "THÂN NHƯỢC") {
        if (phanTramMap[hanhKhacToi] > phanTramMap[hanhBiKhac]) {
            dungThan = hanhSinhToi;
            hyThan = hanhNhatChu;
            giaiThich = `Bạn thuộc mẫu số <b>Thân Nhược</b>. Bản mệnh đang bị các dòng khí bên ngoài bủa vây, gây áp lực nặng nề lên tinh thần. Thượng sách lá số chọn hành <b>${dungThan} (Ấn Tinh)</b> làm <b>Dụng Thần (Ngôi sao cứu mạng)</b> để thực hiện cơ chế 'Thông quan': Hóa giải toàn bộ áp lực thành bài học tri thức, nuôi dưỡng lại sinh lực. <b>Hỷ Thần</b> cứu viện là hành <b>${hyThan} (Tỷ Kiếp)</b> để gia tăng đồng minh chống đỡ.`;
        } else {
            dungThan = hanhNhatChu;
            hyThan = hanhSinhToi;
            giaiThich = `Bạn thuộc mẫu số <b>Thân Nhược</b> do hao tổn nguyên khí để gánh vác việc bên ngoài. Lá số chọn ngay chính hành <b>${dungThan} (Tỷ Kiếp - Bản mệnh)</b> làm <b>Dụng Thần (Điểm tựa nội lực)</b> để tăng cường độ cứng cáp, tự tin đứng vững trên đôi chân của mình. <b>Hỷ Thần</b> là hành <b>${hyThan} (Ấn Tinh)</b> đóng vai trò là hậu phương che chở, bồi bổ năng lượng cốt lõi.`;
        }
        
        phanTichSau = `
          <b style="color:#b91c1c;">🔴 Phe Địch / Tiêu Hao lấn lướt (${phanTramKhacVaHao.toFixed(1)}%):</b> <br>
          <span style="font-size:12.5px; color:#475569; padding-left: 20px; display:block;">
            • Áp lực kìm hãm (<b>${hanhKhacToi}</b>): ${phanTramMap[hanhKhacToi]}% | 
            • Tiêu hao gánh vác (<b>${hanhBiKhac}</b>): ${phanTramMap[hanhBiKhac]}% | 
            • Van xả tiết khí (<b>${hanhTietKhi}</b>): ${phanTramMap[hanhTietKhi]}%
          </span>
          <b style="color:#15803d; margin-top: 8px; display:block;">🟢 Phe Ta / Trợ Lực yếu thế (${phanTramSinhVaCung.toFixed(1)}%):</b> <br>
          <span style="font-size:12.5px; color:#475569; padding-left: 20px; display:block;">
            • Bản mệnh (<b>${hanhNhatChu}</b>): ${phanTramMap[hanhNhatChu]}% <br>
            • Hậu phương tương sinh (<b>${hanhSinhToi}</b>): ${phanTramMap[hanhSinhToi]}%
          </span>
        `;
    
    } else {
        dungThan = hanhNhatChu;
        hyThan = hanhTietKhi;
        phanTichSau = `
          <b style="color:#0369a1;">🔵 Giữ thế cân bằng (${phanTramSinhVaCung.toFixed(1)}%):</b> <br>
          <span style="font-size:12.5px; color:#475569; padding-left: 20px; display:block;">
            • <b>Phe Ta:</b> ${hanhNhatChu} và ${hanhSinhToi} gộp lại chiếm ${phanTramSinhVaCung.toFixed(1)}% <br>
            • <b>Phe Địch:</b> Các hành còn lại giằng co chiếm ${phanTramKhacVaHao.toFixed(1)}%
          </span>
        `;
    }

    return { 
        trangThai: trangThai, 
        giaiThich: giaiThich, 
        phanTichSau: phanTichSau, 
        dungThan: dungThan, 
        hyThan: hyThan, 
        sinh: phanTramSinhVaCung, 
        khac: phanTramKhacVaHao 
    };
}

// ================= ThanSo.gs =================
function tinhBieuDoVaMuiTen(ngay, thang, nam, hoTen) {
  let chuoiSoNgaySinh = String(ngay || "") + String(thang || "") + String(nam || "");
  let counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  
  // Dồn số ngày sinh
  for (let i = 0; i < chuoiSoNgaySinh.length; i++) {
    let num = chuoiSoNgaySinh[i];
    if (counts[num] !== undefined) counts[num]++;
  }

  // Chuẩn hóa họ tên dồn số (Gọi MAP_CHU_SANG_SO từ data.gs)
  let tenChuan = String(hoTen || "").toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D").replace(/[^A-Z]/g, "");
  for (let j = 0; j < tenChuan.length; j++) {
    let soQuyDoi = MAP_CHU_SANG_SO[tenChuan[j]];
    if (soQuyDoi !== undefined) counts[soQuyDoi]++;
  }

  let muiTenSoHuu = []; let muiTenTrong = []; let lineIds = [];

  // Quét 8 trục mũi tên (Gọi TRUC_MUI_TEN từ data.gs)
  TRUC_MUI_TEN.forEach(t => {
    let tinhCoDu = (counts[t.nums[0]] > 0 && counts[t.nums[1]] > 0 && counts[t.nums[2]] > 0);
    let tinhTrong = (counts[t.nums[0]] === 0 && counts[t.nums[1]] === 0 && counts[t.nums[2]] === 0);

    if (tinhCoDu) {
      muiTenSoHuu.push({ id: t.id, name: t.name});
      lineIds.push(t.id);
    }
    if (tinhTrong) {
      muiTenTrong.push({ id: t.id, name: t.name});
    }
  });

  // --- THUẬT TOÁN TÍNH SƠ ĐỒ 4 ĐỈNH CAO KIM TỰ THÁP CHUẨN PITAGO ---
  // Kim tự tháp Pythagore: rút gọn về 1 chữ số (không giữ số chủ đạo 11/22)
  let d = rutGonDon(ngay);
  let m = rutGonDon(thang);
  let y = rutGonDon(nam);

  let chuoiFullNgaySinh = String(ngay) + String(thang) + String(nam);
  let tongTungChuSoGoc = 0;
  for (let k = 0; k < chuoiFullNgaySinh.length; k++) {
    if (!isNaN(chuoiFullNgaySinh[k])) {
      tongTungChuSoGoc += parseInt(chuoiFullNgaySinh[k], 10);
    }
  }

  let soChuDao = rutGonDon(tongTungChuSoGoc);   // 36 - Số chủ đạo (1 chữ số) = tuổi đạt Đỉnh 1

  // Gốc kim tự tháp tính toán nút
  let d1_val = rutGonDinh(m + d);
  let d2_val = rutGonDinh(d + y);
  let d3_val = rutGonDinh(d1_val + d2_val);
  let d4_val = rutGonDinh(m + y);

  // Tính số tuổi đạt đỉnh
  let tuoi_d1 = 36 - soChuDao;
  let tuoi_d2 = tuoi_d1 + 9;
  let tuoi_d3 = tuoi_d2 + 9;
  let tuoi_d4 = tuoi_d3 + 9;

  return {
    counts: counts,
    muiTenSoHuu: muiTenSoHuu,
    muiTenTrong: muiTenTrong,
    lineIds: lineIds,
    pyramid: [
      { dinh: 1, tuoi: tuoi_d1, index: d1_val },
      { dinh: 2, tuoi: tuoi_d2, index: d2_val },
      { dinh: 3, tuoi: tuoi_d3, index: d3_val },
      { dinh: 4, tuoi: tuoi_d4, index: d4_val }
    ]
  };
}

// Hàm bổ trợ rút gọn nút số đơn lẻ
function rutGonTungSo(n) {
  let s = String(n); let sum = 0;
  for(let i=0; i<s.length; i++) sum += parseInt(s[i],10);
  while(sum > 9 && sum !== 11 && sum !== 22) {
    let tmp = String(sum); sum = parseInt(tmp[0],10) + parseInt(tmp[1],10);
  }
  return sum;
}
function rutGonDinh(n) {
  while(n > 9) { let s = String(n); n = parseInt(s[0],10) + parseInt(s[1],10); }
  return n;
}

// Rút gọn tổng chữ số về 1 chữ số (1-9)
function rutGonDon(n) {
  let v = 0, s = String(n);
  for (let i = 0; i < s.length; i++) { if (!isNaN(s[i])) v += parseInt(s[i], 10); }
  while (v > 9) { let t = 0, q = String(v); for (let i = 0; i < q.length; i++) t += parseInt(q[i], 10); v = t; }
  return v;
}

// ================= BatTrach.gs =================
function tinhBatTrachChuan(namSinhAm, gioiTinh) {
  let y = parseInt(namSinhAm, 10);
  
  // 1. Thuật toán tính số dư Cung Phi cốt lõi
  let du = 0;
  let sNam = String(y);
  for (let i = 0; i < sNam.length; i++) {
    du += parseInt(sNam[i], 10);
  }
  
  du = du % 9;
  if (du === 0) du = 9;

  let cungId = (gioiTinh === "Nam") ? (11 - du) % 9 : (du + 4) % 9;
  if (cungId === 0) cungId = 9;

  const cungTen = {
    1: "Khảm",
    2: "Khôn",
    3: "Chấn",
    4: "Tốn",
    5: "Khôn",
    6: "Càn",
    7: "Đoài",
    8: "Cấn",
    9: "Ly"
  };

  let cungPhi = "";
  if (gioiTinh === "Nam" && cungId === 5) {
    cungPhi = "Khôn";
  } else if (gioiTinh === "Nữ" && cungId === 5) {
    cungPhi = "Cấn";
  } else {
    cungPhi = cungTen[cungId];
  }

  const maTranNguHanh = {
    "Khảm": { m: "Thủy", n: "Đông Tứ Mệnh" }, 
    "Ly":   { m: "Hỏa", n: "Đông Tứ Mệnh" },
    "Chấn": { m: "Mộc", n: "Đông Tứ Mệnh" }, 
    "Tốn":  { m: "Mộc", n: "Đông Tứ Mệnh" },
    "Cấn":  { m: "Thổ", n: "Tây Tứ Mệnh" }, 
    "Khôn": { m: "Thổ", n: "Tây Tứ Mệnh" },
    "Đoài": { m: "Kim", n: "Tây Tứ Mệnh" }, 
    "Càn":  { m: "Kim", n: "Tây Tứ Mệnh" }
  };
  
  // (trước đây thiếu let → rò rỉ biến toàn cục)
  let menhCung = maTranNguHanh[cungPhi].m;
  let nhomHuong = maTranNguHanh[cungPhi].n;

  // 4. Ma trận xuất 8 hướng Cát (Tốt) / Hung (Xấu) chuẩn Bát Trạch
  let duLieuHuong = MA_TRAN_HUONG[cungPhi];

  return {
    cungPhi: cungPhi,
    menhCung: menhCung,
    nhomHuong: nhomHuong,
    huongTot: duLieuHuong.tot,
    huongXau: duLieuHuong.xau
  };
}

// ================= HoangDao.gs =================
function tinhCungHoangDaoHeTay(ngay, thang) {
  let dDuong = parseInt(ngay, 10) || 1;
  let mDuong = parseInt(thang, 10) || 1;
  let tenCung = "";
  let nguyenToTay = "";

  // Ma trận tra cứu ngày sinh ra Cung Hoàng Đạo chuẩn quốc tế
  if ((mDuong == 3 && dDuong >= 21) || (mDuong == 4 && dDuong <= 19)) { tenCung = "Bạch Dương"; nguyenToTay = "Lửa"; }
  else if ((mDuong == 4 && dDuong >= 20) || (mDuong == 5 && dDuong <= 20)) { tenCung = "Kim Ngưu"; nguyenToTay = "Đất"; }
  else if ((mDuong == 5 && dDuong >= 21) || (mDuong == 6 && dDuong <= 20)) { tenCung = "Song Tử"; nguyenToTay = "Khí"; }
  else if ((mDuong == 6 && dDuong >= 21) || (mDuong == 7 && dDuong <= 22)) { tenCung = "Cự Giải"; nguyenToTay = "Nước"; }
  else if ((mDuong == 7 && dDuong >= 23) || (mDuong == 8 && dDuong <= 22)) { tenCung = "Sư Tử"; nguyenToTay = "Lửa"; }
  else if ((mDuong == 8 && dDuong >= 23) || (mDuong == 9 && dDuong <= 22)) { tenCung = "Xử Nữ"; nguyenToTay = "Đất"; }
  else if ((mDuong == 9 && dDuong >= 23) || (mDuong == 10 && dDuong <= 22)) { tenCung = "Thiên Bình"; nguyenToTay = "Khí"; }
  else if ((mDuong == 10 && dDuong >= 23) || (mDuong == 11 && dDuong <= 21)) { tenCung = "Bọ Cạp"; nguyenToTay = "Nước"; }
  else if ((mDuong == 11 && dDuong >= 22) || (mDuong == 12 && dDuong <= 21)) { tenCung = "Nhân Mã"; nguyenToTay = "Lửa"; }
  else if ((mDuong == 12 && dDuong >= 22) || (mDuong == 1 && dDuong <= 19)) { tenCung = "Ma Kết"; nguyenToTay = "Đất"; }
  else if ((mDuong == 1 && dDuong >= 20) || (mDuong == 2 && dDuong <= 18)) { tenCung = "Bảo Bình"; nguyenToTay = "Khí"; }
  else { tenCung = "Song Ngư"; nguyenToTay = "Nước"; }

  return {
    tenCung: tenCung,
    nguyenTo: nguyenToTay
  };
}

// Cung Mặt Trăng: kinh độ Mặt Trăng (trung bình + các số hạng nhiễu loạn chính, sai số ~0.3°)
// gioSinh: giờ thập phân theo giờ ĐỒNG HỒ địa phương (vd 10.5); gmt: múi giờ (VN = 7)
function tinhMoonSignChuanThienVan(ngay, thang, nam, gioSinh, gmt) {
  const zodiacArr = ["Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải", "Sư Tử", "Xử Nữ", "Thiên Bình", "Bọ Cạp", "Nhân Mã", "Ma Kết", "Bảo Bình", "Song Ngư"];
  let yy = parseInt(nam, 10), mm = parseInt(thang, 10), dd = parseInt(ngay, 10);
  let hh = parseFloat(gioSinh);
  if (isNaN(hh)) hh = 12.0;                 // (trước đây "|| 12.0" biến 0h thành 12h trưa)
  hh -= (gmt === undefined || gmt === null ? 7 : gmt);   // đổi giờ địa phương → UT

  if (mm <= 2) { yy--; mm += 12; }
  let A = Math.floor(yy / 100);
  let B = 2 - A + Math.floor(A / 4);
  let jd = Math.floor(365.25 * (yy + 4716)) + Math.floor(30.6001 * (mm + 1)) + dd + B - 1524.5 + (hh / 24.0);

  let T = (jd - 2451545.0) / 36525.0, dr = Math.PI / 180;
  let Lp = 218.3164477 + 481267.88123421 * T;
  let D  = 297.8501921 + 445267.1114034 * T;
  let M  = 357.5291092 + 35999.0502909 * T;
  let Mp = 134.9633964 + 477198.8675055 * T;
  let F  = 93.2720950 + 483202.0175233 * T;
  let lon = Lp + 6.289 * Math.sin(Mp * dr) + 1.274 * Math.sin((2 * D - Mp) * dr) + 0.658 * Math.sin(2 * D * dr)
          + 0.214 * Math.sin(2 * Mp * dr) - 0.186 * Math.sin(M * dr) - 0.114 * Math.sin(2 * F * dr);
  lon = lon % 360; if (lon < 0) lon += 360;
  return zodiacArr[Math.floor(lon / 30)];
}

// Cung Mọc (Ascendant) tính thật từ thời gian thiên văn địa phương + vĩ độ + kinh độ nơi sinh
// (thay cho công thức "mỗi 2 giờ dịch 1 cung" cũ vốn không đúng với thiên văn)
function tinhCungMocThienVan(ngay, thang, nam, gioSinh, viTriKey) {
  const zodiacArr = ["Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải", "Sư Tử", "Xử Nữ", "Thiên Bình", "Bọ Cạp", "Nhân Mã", "Ma Kết", "Bảo Bình", "Song Ngư"];
  let vt = timViTri(viTriKey);
  let hh = parseFloat(gioSinh); if (isNaN(hh)) hh = 12.0;
  let jd = tinhJDNChuan(parseInt(ngay, 10), parseInt(thang, 10), parseInt(nam, 10)) - 0.5 + (hh - vt.gmt) / 24.0;
  let T = (jd - 2451545.0) / 36525.0, dr = Math.PI / 180;
  let kinhDo = 15 * vt.gmt + vt.mins / 4.0;                 // độ Đông
  let viDo = viDoTheoViTri(vt.key);                         // độ Bắc
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  let ramc = (((gmst + kinhDo) % 360) + 360) % 360;
  let eps = 23.4392911 - 0.0130042 * T;
  let asc = Math.atan2(Math.cos(ramc * dr), -(Math.sin(ramc * dr) * Math.cos(eps * dr) + Math.tan(viDo * dr) * Math.sin(eps * dr))) / dr;
  asc = ((asc % 360) + 360) % 360;
  return zodiacArr[Math.floor(asc / 30)];
}


// ================= GiaoThoaDongTay.gs =================
function tinhGiaoThoaDongTay(nguyenToTay, dungThanDong, hanhNhatChu) {
  let dtChuan = String(dungThanDong || "").replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "").trim();
  let nToTay = String(nguyenToTay || "").trim();
  let hNhatChu = String(hanhNhatChu || "").trim();

  // --- 1. LUẬN ĐỐI CHIẾU ĐÔNG TÂY (CẢI VẬN) ---
  let txtDoiChieu = "";
  if ((nToTay === "Lửa" && dtChuan === "Hỏa") || (nToTay === "Đất" && dtChuan === "Thổ") || (nToTay === "Nước" && dtChuan === "Thủy")) {
     txtDoiChieu = `Tư duy nguyên tố ${nToTay} (Tây) tương hợp tuyệt đối với năng lượng Dụng thần ${dtChuan} (Đông). Định hướng hành động cải vận rất rõ ràng, nhất quán.`;
  } else if (nToTay === "Khí") {
     if (dtChuan === "Mộc") txtDoiChieu = `Sự linh hoạt, nhạy bén của hệ Khí sẽ thổi bùng hạt giống sáng tạo và tư duy phát triển của Dụng thần Mộc vươn xa.`;
     else if (dtChuan === "Hỏa") txtDoiChieu = `Khí giúp ngọn lửa Dụng thần Hỏa bùng cháy mạnh mẽ, gia tăng nhiệt huyết, sự tự tin và khả năng truyền cảm hứng.`;
     else if (dtChuan === "Kim") txtDoiChieu = `Tư duy tự do của Khí giúp làm mềm sự cứng nhắc của Dụng thần Kim, tạo nên một chiến lược gia vừa kỷ luật vừa linh hoạt.`;
     else txtDoiChieu = `Sự giao tiếp khôn khéo của hệ Khí làm đòn bẩy xuất sắc để kích hoạt năng lượng hành bổ trợ ${dtChuan}.`;
  } else {
     txtDoiChieu = `Khí chất phương Tây hệ ${nToTay} sẽ là công cụ tâm lý đắc lực, bù đắp mảnh ghép thiếu hụt để bạn thực thi các hành động cải vận thuộc phương Đông (Dụng thần ${dtChuan}).`;
  }

  // --- 2. LUẬN TÍNH CÁCH GIAO THOA (TRONG NGOÀI) ---
  let isHop = false;
  if (nToTay === "Lửa" && ["Hỏa", "Mộc", "Thổ"].includes(hNhatChu)) isHop = true;
  if (nToTay === "Đất" && ["Thổ", "Hỏa", "Kim"].includes(hNhatChu)) isHop = true;
  if (nToTay === "Nước" && ["Thủy", "Kim", "Mộc"].includes(hNhatChu)) isHop = true;
  if (nToTay === "Khí" && ["Mộc", "Thủy", "Hỏa"].includes(hNhatChu)) isHop = true;

  let txtTitle = isHop ? "Nhất Quán" : "Đa Chiều";
  let txtDesc = isHop 
      ? `Nhật Chủ (Bản ngã Đông) hành ${hNhatChu} hòa hợp với Cung Hoàng Đạo hệ ${nToTay}. Tính cách trong ngoài đồng nhất, thẳng thắn, dễ dàng tập trung toàn bộ nội lực để đạt mục tiêu.`
      : `Nhật Chủ (Bản ngã Đông) hành ${hNhatChu} xung đột nhẹ với hệ ${nToTay} của Cung Hoàng Đạo. Tuy dễ mâu thuẫn cảm xúc nhưng sở hữu góc nhìn đa chiều, khả năng thích nghi cực kỳ cao.`;

  // Trả về Object phẳng chứa thuộc tính sạch
  return {
    doiChieu: txtDoiChieu,
    trangThai: txtTitle,
    isHop: isHop,
    moTa: txtDesc
  };
}

// ================= TamTai.gs =================
function tinhHanPhuongDong(namXemHan, tuoiMu, chiNamSinh, gioiTinh) {
    // Đảm bảo mảng chiArr được khai báo an toàn bên trong hàm để không phụ thuộc file khác
    const chiArr = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    // --- 1. TÍNH TAM TAI ---
    let yHarm = parseInt(namXemHan, 10) || new Date().getFullYear();
    let idxChiHienTai = (yHarm - 4) % 12;
    if (idxChiHienTai < 0) idxChiHienTai += 12;
    let chiHienTai = chiArr[idxChiHienTai];
    let isTamTai = false;
    
    // Chuẩn hóa bộ gõ viết hoa viết thường để tránh lỗi so sánh chuỗi
    let chiSinh = chiNamSinh ? String(chiNamSinh).trim().replace("Tị", "Tỵ") : "";
    
    if (["Thân", "Tý", "Thìn"].includes(chiSinh)) isTamTai = ["Dần", "Mão", "Thìn"].includes(chiHienTai);
    else if (["Dần", "Ngọ", "Tuất"].includes(chiSinh)) isTamTai = ["Thân", "Dậu", "Tuất"].includes(chiHienTai);
    else if (["Tỵ", "Dậu", "Sửu"].includes(chiSinh)) isTamTai = ["Hợi", "Tý", "Sửu"].includes(chiHienTai);
    else if (["Hợi", "Mão", "Mùi"].includes(chiSinh)) isTamTai = ["Tỵ", "Ngọ", "Mùi"].includes(chiHienTai);

    // --- 2. TÍNH KIM LÂU ---
    const duKimLau = tuoiMu % 9;
    let isKimLau = false;
    let txtKimLauStatus = '<span class="badge badge-good">An Toàn</span>';
    let txtKimLauResult = 'Không phạm Kim Lâu, kết cấu nhân khí vững chắc.';
    let txtKimLauShort = 'Không phạm Kim Lâu, an toàn.';

    if (duKimLau === 1) { isKimLau = true; txtKimLauStatus = '<span class="badge badge-bad">Kim Lâu Thân</span>'; txtKimLauResult = 'Hại cho bản thân chủ nhà, kỵ đứng tên khởi công.'; txtKimLauShort = 'Phạm Kim Lâu Thân (Kỵ bản thân).'; }
    else if (duKimLau === 3) { isKimLau = true; txtKimLauStatus = '<span class="badge badge-bad">Kim Lâu Thê</span>'; txtKimLauResult = 'Mang tai ách cho người phối ngẫu (vợ/chồng).'; txtKimLauShort = 'Phạm Kim Lâu Thê (Kỵ vợ/chồng).'; }
    else if (duKimLau === 6) { isKimLau = true; txtKimLauStatus = '<span class="badge badge-bad">Kim Lâu Tử</span>'; txtKimLauResult = 'Gây bất lợi cho con cái trong gia đạo.'; txtKimLauShort = 'Phạm Kim Lâu Tử (Kỵ con cái).'; }
    else if (duKimLau === 8) { isKimLau = true; txtKimLauStatus = '<span class="badge badge-bad">Kim Lâu Súc</span>'; txtKimLauResult = 'Kỵ chăn nuôi, ảnh hưởng nhẹ đến kinh tế tài sản.'; txtKimLauShort = 'Phạm Kim Lâu Súc (Kỵ chăn nuôi/tài sản).'; }

    // --- 3. TÍNH HOANG ỐC ---
    const listHoangOc = [
        { ten: "Nhất Cát", tot: true, moTa: "Tốt: Nhất Cát - Chốn an cư tốt, vạn sự hanh thông." },
        { ten: "Nhì Nghi", tot: true, moTa: "Tốt: Nhì Nghi - Nhà cửa hưng vượng, hứa hẹn giàu có." },
        { ten: "Tam Địa Sát", tot: false, moTa: "Xấu: Tam Địa Sát - Chủ nhà dễ sinh bệnh tật, hao tổn." },
        { ten: "Tứ Tấn Tài", tot: true, moTa: "Tốt: Tứ Tấn Tài - Phúc lộc tới nhà, kinh doanh đắc lợi." },
        { ten: "Ngũ Thọ Tử", tot: false, moTa: "Xấu: Ngũ Thọ Tử - Gia đạo dễ ly tán, năng lượng suy kiệt." },
        { ten: "Lục Hoang Ốc", tot: false, moTa: "Xấu: Lục Hoang Ốc - Khó thành công, đất đai trống vắng." }
    ];

    let tMu = parseInt(tuoiMu, 10) || 1;
    let tuoiChuc = Math.floor(tMu / 10);
    let tuoiLe = tMu % 10;
    
    let idxHoangOc = 0;
    if (tuoiLe === 0) {
      idxHoangOc = (tuoiChuc - 1) % 6;
    } else {
      idxHoangOc = (tuoiChuc + tuoiLe - 1) % 6;
    }
    
    // Xử lý bù tràn mảng âm nếu tuổi nhỏ hơn 10
    if (idxHoangOc < 0) idxHoangOc += 6;

    let hoangOcObj = listHoangOc[idxHoangOc];
    let txtHoangOcStatus = hoangOcObj.tot ? `<span class="badge badge-good">${hoangOcObj.ten}</span>` : `<span class="badge badge-bad">${hoangOcObj.ten}</span>`;

    // --- 4. TÍNH SAO HẠN CỬU DIỆU THEO GIỚI TÍNH ---
    const bangSao = {
      "Nam": { 1: "La Hầu", 2: "Thổ Tú", 3: "Thủy Diệu", 4: "Thái Bạch", 5: "Thái Dương", 6: "Vân Hớn", 7: "Kế Đô", 8: "Thái Âm", 9: "Mộc Đức" },
      "Nữ": { 1: "Kế Đô", 2: "Vân Hớn", 3: "Mộc Đức", 4: "Thái Âm", 5: "Thổ Tú", 6: "La Hầu", 7: "Thái Dương", 8: "Thái Bạch", 9: "Thủy Diệu" }
    };

    const bangHan = {
      "Nam": { 1: "Tam Kheo", 2: "Ngũ Mộ", 3: "Thiên Tinh", 4: "Toán Tận", 5: "Thiên La", 6: "Diêm Vương", 7: "Địa Võng", 8: "Lục Hoang", 9: "Huỳnh Tuyền" },
      "Nữ": { 1: "Thiên Tinh", 2: "Ngũ Mộ", 3: "Tam Kheo", 4: "Huỳnh Tuyền", 5: "Toán Tận", 6: "Địa Võng", 7: "Diêm Vương", 8: "Thiên La", 9: "Lục Hoang" }
    };

    // Chu kỳ 9 năm
    let chiSoSao = tMu % 9;
    if (chiSoSao === 0) chiSoSao = 9;

    // Chuẩn hóa giới tính đầu vào (Mặc định Nam nếu lỡ truyền sai)
    let gTinh = (String(gioiTinh).trim() === "Nữ") ? "Nữ" : "Nam";
    let saoChieuMenh = bangSao[gTinh][chiSoSao];
    let nienHanMet = bangHan[gTinh][chiSoSao];

    // --- TRẢ VỀ KẾT QUẢ GỘP ---
    return {
        gioiTinh: gTinh,
        tamTai: { isPham: isTamTai, textShort: isTamTai ? "Phạm Tam Tai" : "Không phạm Tam Tai" },
        kimLau: { isPham: isKimLau, statusHTML: txtKimLauStatus, resultFull: txtKimLauResult, resultShort: txtKimLauShort },
        hoangOc: { obj: hoangOcObj, statusHTML: txtHoangOcStatus },
        cuuDieu: { sao: saoChieuMenh, han: nienHanMet }
    };
}


// =====================================================================
// Đồng bộ Dụng Thần: Dụng Thần HIỂN THỊ (kèm bảng màu/hướng) là kết quả của tinhTongQuan (có xét mùa sinh).
// Khối "phân tích chi tiết" trước đây tự chọn Dụng Thần theo % riêng nên ~63% lá số bị hai nơi nói hai hành khác nhau.
// Nay: lời giải thích luôn bám đúng Dụng Thần đang hiển thị; hành mà phép tính % chọn (nếu hợp lý và khác) hiện là "Dụng Thần phụ".
// =====================================================================
function vaiTroHanh_(me, h) {
  var SINH = { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" };   // x sinh SINH[x]
  var KHAC = { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" };   // x khắc KHAC[x]
  if (h === me) return "ty";
  if (SINH[h] === me) return "an";
  if (SINH[me] === h) return "thuc";
  if (KHAC[me] === h) return "tai";
  return "quan";
}
var TEN_VAI_TRO_ = { an: "Ấn Tinh", ty: "Tỷ Kiếp", thuc: "Thực Thương", tai: "Tài Tinh", quan: "Quan Sát" };
var Y_VAI_TRO_ = {
  an: "giống một <b>nguồn nuôi dưỡng</b>: học hỏi, nghỉ ngơi đúng lúc và có người che chở sẽ giúp bạn lấy lại sức.",
  ty: "giống <b>đồng minh cùng hành</b>: bạn bè, đồng đội và môi trường quen thuộc tiếp thêm sự tự tin, giúp bạn đứng vững.",
  thuc: "giống một <b>van xả</b>: dùng sáng tạo, trình bày, làm ra sản phẩm để tiết bớt nội lực dư thay vì dồn nén.",
  tai: "giống việc <b>biến nội lực thành thành quả</b>: công việc có kết quả đo được, biết quản lý tiền bạc và nguồn lực.",
  quan: "giống một <b>khung kỷ luật</b>: mục tiêu rõ, nguyên tắc và thử thách vừa sức giúp bạn rèn luyện và trưởng thành."
};
function dongBoDungThan_(ct, tq) {
  var me = tq.nguHanh, dt = tq.dungThan, hy = tq.hyThan;
  if (!dt || !me) return ct;
  var ketQua = String(tq.ketQuaThanVuongNhuoc || "");
  var tt = /Vượng/i.test(ketQua) ? "THÂN VƯỢNG" : (/Nhược/i.test(ketQua) ? "THÂN NHƯỢC" : ct.trangThai);
  var rDt = vaiTroHanh_(me, dt), rHy = hy ? vaiTroHanh_(me, hy) : null;
  var ttThuong = tt === "THÂN VƯỢNG" ? "Thân Vượng" : (tt === "THÂN NHƯỢC" ? "Thân Nhược" : "cân bằng");
  var mo = tt === "THÂN VƯỢNG"
    ? "Nội lực bản mệnh dồi dào, nên cần chỗ để <b>tiêu bớt và hướng năng lượng đi đúng đường</b>."
    : (tt === "THÂN NHƯỢC" ? "Nội lực bản mệnh còn mỏng, nên cần được <b>nâng đỡ và bồi đắp</b>." : "Lá số khá cân bằng, chỉ cần giữ nhịp.");
  var gt = "Bạn thuộc mẫu <b>" + ttThuong + "</b>. " + mo + " Lá số chọn hành <b>" + dt + " (" + TEN_VAI_TRO_[rDt] + ")</b> làm <b>Dụng Thần</b> — " + Y_VAI_TRO_[rDt] +
    (hy ? " <b>Hỷ Thần</b> là hành <b>" + hy + (rHy ? " (" + TEN_VAI_TRO_[rHy] + ")" : "") + "</b>, hỗ trợ thêm cho Dụng Thần." : "");
  // Trường hợp ưu tiên điều hậu: Dụng Thần không thuộc nhóm "nâng đỡ" (khi Nhược) hay "tiêu bớt" (khi Vượng)
  var hopVaiTro = (tt === "THÂN NHƯỢC" && (rDt === "an" || rDt === "ty")) || (tt === "THÂN VƯỢNG" && (rDt === "thuc" || rDt === "quan" || rDt === "tai")) || tt === ct.trangThai && tt !== "THÂN VƯỢNG" && tt !== "THÂN NHƯỢC";
  if (!hopVaiTro) gt += " <br><span style=\"color:#475569\">Lưu ý: trường hợp này lá số <b>ưu tiên cân bằng nóng–lạnh theo mùa sinh</b> (gọi là <b>điều hậu</b>) hơn là chỉ xét mạnh–yếu, nên hành được chọn có thể khác với quy tắc thông thường.</span>";
  // Dụng Thần phụ: lựa chọn của phép tính theo tỷ lệ %, chỉ nêu khi khác và hợp với kết luận Vượng/Nhược
  var phu = null;
  if (ct.dungThan && ct.dungThan !== dt && ct.dungThan !== hy) {
    var rp = vaiTroHanh_(me, ct.dungThan);
    var hopLe = tt === "THÂN NHƯỢC" ? (rp === "an" || rp === "ty") : (tt === "THÂN VƯỢNG" ? (rp === "thuc" || rp === "quan" || rp === "tai") : true);
    if (hopLe) { phu = ct.dungThan; gt += " <br><span style=\"color:#475569\">Ngoài ra, nếu chỉ xét tỷ lệ phần trăm các hành thì <b>" + phu + " (" + TEN_VAI_TRO_[rp] + ")</b> cũng là hướng bổ trợ tốt — bạn có thể xem như <b>Dụng Thần phụ</b>.</span>"; }
  }
  return { trangThai: tt, giaiThich: gt, phanTichSau: ct.phanTichSau, dungThan: dt, hyThan: hy, dungThanPhu: phu, sinh: ct.sinh, khac: ct.khac };
}


// Cung Mặt Trời theo KINH ĐỘ THỰC của Mặt Trời tại thời điểm sinh (bảng ngày cố định cũ lệch ~2% ngày sinh, nhất là người sinh sát ngày chuyển cung)
function tinhCungMatTroiThienVan_(ngay, thang, nam, gioThap, gmt) {
  var TEN = ["Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải", "Sư Tử", "Xử Nữ", "Thiên Bình", "Bọ Cạp", "Nhân Mã", "Ma Kết", "Bảo Bình", "Song Ngư"];
  var NT = ["Lửa", "Đất", "Khí", "Nước"];
  var g = isFinite(gioThap) ? gioThap : 12;
  var lon = kinhDoMatTroiJD(jdUTTuNgayGio(parseInt(ngay, 10), parseInt(thang, 10), parseInt(nam, 10), Math.floor(g), Math.round((g - Math.floor(g)) * 60), gmt === undefined ? 7 : gmt));
  var i = Math.floor(lon / 30) % 12;
  return { tenCung: TEN[i], nguyenTo: NT[i % 4] };   // Bạch Dương Lửa, Kim Ngưu Đất, Song Tử Khí, Cự Giải Nước, Sư Tử Lửa…
}

// ================= Code.gs (lõi) =================
// Giao diện gọi hàm này. Mọi lỗi được trả về dạng {success:false, error} để UI hiển thị rõ ràng
function getAllData(dataInput) {
  try {
    return xuLyTatCa_(dataInput);
  } catch (e) {
    console.error(e && e.stack ? e.stack : e);
    return { success: false, error: String(e && e.message ? e.message : e) };
  }
}

function kiemTraDauVao_(inp) {
  var d = parseInt(inp.ngay, 10), m = parseInt(inp.thang, 10), y = parseInt(inp.nam, 10);
  var h = parseInt(inp.gio, 10), p = parseInt(inp.phut, 10) || 0;
  if (!(y >= 1900 && y <= 2100)) throw new Error('Năm sinh phải trong khoảng 1900 – 2100.');
  if (!(m >= 1 && m <= 12)) throw new Error('Tháng sinh không hợp lệ.');
  var t = new Date(Date.UTC(y, m - 1, d));
  if (!(d >= 1) || t.getUTCDate() !== d || t.getUTCMonth() !== m - 1) throw new Error('Ngày ' + d + '/' + m + '/' + y + ' không tồn tại.');
  if (!(h >= 0 && h <= 23)) throw new Error('Giờ sinh phải từ 0 đến 23.');
  if (!(p >= 0 && p <= 59)) throw new Error('Phút sinh phải từ 0 đến 59.');
}

// Sao nhập Trung Cung năm Huyền Không + 9 sao bay thuận theo Lạc Thư.
// Thứ tự mảng trả về: [Đông Nam, Nam, Tây Nam, Đông, Trung Cung, Tây, Đông Bắc, Bắc, Tây Bắc]
function tinhHuyenKhong_(namXem) {
  var s = 0, str = String(namXem);
  for (var i = 0; i < str.length; i++) s += parseInt(str[i], 10);
  while (s > 9) { var t = 0, q = String(s); for (var j = 0; j < q.length; j++) t += parseInt(q[j], 10); s = t; }
  var trung = 11 - s;                       // đúng cho cả 1900-2099 (bản cũ dùng 10 cho thế kỷ 21 → lệch 1 sao)
  while (trung > 9) trung -= 9;
  while (trung <= 0) trung += 9;
  var thuTuBay = ['TC', 'TB', 'T', 'DB', 'N', 'B', 'TN', 'D', 'DN'];
  var o = {};
  thuTuBay.forEach(function (k, idx) { o[k] = ((trung - 1 + idx) % 9) + 1; });
  return { saoTrungCung: trung, mangSaoPhuongVi: [o.DN, o.N, o.TN, o.D, o.TC, o.T, o.DB, o.B, o.TB] };
}

function layHanhNapAm_(tenCanChi) {
  if (MANG_HANH_KIM.includes(tenCanChi)) return 'Kim';
  if (MANG_HANH_MOC.includes(tenCanChi)) return 'Mộc';
  if (MANG_HANH_THUY.includes(tenCanChi)) return 'Thủy';
  if (MANG_HANH_HOA.includes(tenCanChi)) return 'Hỏa';
  if (MANG_HANH_THO.includes(tenCanChi)) return 'Thổ';
  return (NAP_AM[tenCanChi] && NAP_AM[tenCanChi].m) || 'Thổ';
}

function xuLyTatCa_(dataInput) {
  kiemTraDauVao_(dataInput);

  var gioiTinhChuan = String(dataInput.gioiTinh || dataInput.gioitinh || 'Nam').trim();
  gioiTinhChuan = gioiTinhChuan.charAt(0).toUpperCase() + gioiTinhChuan.slice(1).toLowerCase();
  if (gioiTinhChuan !== 'Nữ') gioiTinhChuan = 'Nam';

  var viTri = timViTri(dataInput.vitri);

  // ---- Lịch ----
  var kqDuongLich = tinhDuongLich(dataInput);            // đã bù kinh độ
  var batTu = tinhBatTuTietKhi(kqDuongLich);              // Tứ Trụ theo Tiết Khí
  var khoiVan = tinhKhoiVan(kqDuongLich, batTu.canNamIdx, gioiTinhChuan);
  kqDuongLich.khoangCachNgayTietKhi = khoiVan.soNgay;
  var kqAmLich = tinhAmLich(kqDuongLich);

  // ---- Bát Tự ----
  var kqTongQuan = tinhTongQuan(dataInput, gioiTinhChuan, kqDuongLich, batTu);
  var chiTietDanhGia = danhGiaThanVuongNhuoc(kqTongQuan.nguHanh, kqTongQuan.phanTramNguHanhMang);
  chiTietDanhGia = dongBoDungThan_(chiTietDanhGia, kqTongQuan);   // một Dụng Thần duy nhất cho toàn bộ trang

  // ---- Thần số học ----
  var tongChuSo = 0, chuoiNgaySinh = String(parseInt(dataInput.ngay, 10)) + String(parseInt(dataInput.thang, 10)) + String(parseInt(dataInput.nam, 10));
  for (var i = 0; i < chuoiNgaySinh.length; i++) tongChuSo += parseInt(chuoiNgaySinh[i], 10);
  var kqRutGonSo = rutGonSo(tongChuSo, true);               // cộng TỪNG CHỮ SỐ của cả ngày sinh (bản cũ cộng ngày+tháng+năm rồi mới rút gọn)
  var yNghiaChuDao = Y_NGHIA_SO_CHU_DAO[kqRutGonSo] || Y_NGHIA_SO_CHU_DAO[rutGonSo(kqRutGonSo)] || '';

  var namHienTai = dataInput.namXemHan ? parseInt(dataInput.namXemHan, 10) : new Date().getFullYear();
  var kqTinhNamCaNhan = tinhNamCaNhan(dataInput.ngay, dataInput.thang, namHienTai);
  var namCaNhanChon = DICTIONARY_NAM_CA_NHAN[kqTinhNamCaNhan];
  var indexNamCaNhan = (kqTinhNamCaNhan % 9 === 0) ? 9 : (kqTinhNamCaNhan % 9);
  var noiDungCurr = Y_NGHIA_SO_CHU_DAO[indexNamCaNhan];

  var kqThanSo = tinhBieuDoVaMuiTen(dataInput.ngay, dataInput.thang, dataInput.nam, dataInput.hoten);

  // ---- Hạn phương Đông (tuổi mụ theo NĂM ÂM LỊCH sinh) ----
  var chiNamSinh = '';
  if (kqAmLich && kqAmLich.canChiNam) {
    var parts = kqAmLich.canChiNam.split(' ');
    if (parts.length > 1) chiNamSinh = parts[1];
  }
  var tuoiMu = (namHienTai - kqAmLich.nam) + 1;
  var kqHanPhuongDong = tinhHanPhuongDong(namHienTai, tuoiMu, chiNamSinh, gioiTinhChuan);
  var luanGiaiGioiTinh = (gioiTinhChuan === 'Nam') ? kqTongQuan.luanGiaiNam : kqTongQuan.luanGiaiNu;

  // ---- Chiêm tinh phương Tây (dùng giờ đồng hồ gốc, không dùng giờ đã bù kinh độ) ----
  var gioThapPhan = (parseInt(dataInput.gio, 10) || 0) + (parseInt(dataInput.phut, 10) || 0) / 60;
  var kqCungTay = tinhCungMatTroiThienVan_(dataInput.ngay, dataInput.thang, dataInput.nam, gioThapPhan, viTri.gmt);   // theo kinh độ thực của Mặt Trời tại giờ sinh
  var moonSign = tinhMoonSignChuanThienVan(dataInput.ngay, dataInput.thang, dataInput.nam, gioThapPhan, viTri.gmt);
  var ascendant = tinhCungMocThienVan(dataInput.ngay, dataInput.thang, dataInput.nam, gioThapPhan, viTri.key || dataInput.vitri);
  var kqGiaoThoa = tinhGiaoThoaDongTay(kqCungTay.nguyenTo, kqTongQuan.dungThan, kqTongQuan.nguHanh);

  // ---- Bát Trạch (năm âm lịch sinh) ----
  var batTrachObj = tinhBatTrachChuan((kqAmLich && kqAmLich.nam) || dataInput.nam, gioiTinhChuan);
  var mauCungPhi = MA_TRAN_CUNG_PHI[batTrachObj.cungPhi];

  // ---- Huyền Không ----
  var hk = tinhHuyenKhong_(namHienTai);

  // ---- Đại Vận: bước theo tháng Bát Tự, thuận/nghịch theo âm dương + giới tính ----
  var danhSachCanChiDaiVan = [];
  for (var n = 1; n <= 6; n++) {
    var buoc = khoiVan.thuan ? n : -n;
    var can = CANS[(((batTu.canThangIdx + buoc) % 10) + 10) % 10];
    var chi = CHIS[(((batTu.chiThangIdx + buoc) % 12) + 12) % 12];
    var ten = can + ' ' + chi;
    danhSachCanChiDaiVan.push({ canChi: ten, hanh: layHanhNapAm_(ten) });
  }

  return {
    success: true,
    hoTen: dataInput.hoten,
    gioiTinhChuan: gioiTinhChuan,
    namCaNhanChon: namCaNhanChon,
    viTriNhanDien: viTri.key || '(không khớp địa danh — dùng GMT+7, lệch 0 phút)',

    // CaculateDate.gs / TuTru.gs
    lichDuong: kqDuongLich,
    lichAm: kqAmLich,
    batTu: {
      canChiNam: batTu.canNam + ' ' + batTu.chiNam, canChiThang: batTu.canThang + ' ' + batTu.chiThang,
      canChiNgay: batTu.canNgay + ' ' + batTu.chiNgay, canChiGio: batTu.canGio + ' ' + batTu.chiGio,
      thuan: khoiVan.thuan, soNgayToiTiet: khoiVan.soNgay
    },
    soChuDao: kqRutGonSo,
    yNghiaChuDao: yNghiaChuDao,
    namCaNhan: kqTinhNamCaNhan,
    yNghiaNamCaNhan: noiDungCurr,

    // OverView.gs
    nhatChu: kqTongQuan.nhatChu,
    nguHanh: kqTongQuan.nguHanh,
    tieuDe: kqTongQuan.tieuDe,
    tongQuan: kqTongQuan.tongQuan,
    uu: kqTongQuan.uu,
    nhuoc: kqTongQuan.nhuoc,
    nhanDien: kqTongQuan.nhanDien,
    dacTinhNgheNghiep: kqTongQuan.dacTinhNgheNghiep,
    ngheNghiepGoiY: kqTongQuan.ngheNghiepGoiY,
    ngheNghiepTheoHanh: kqTongQuan.ngheNghiepTheoHanh,
    tinhChat: kqTongQuan.tinhChat,
    hinhTuong: kqTongQuan.hinhTuong,
    tinhCachUuDiem: kqTongQuan.tinhCachUuDiem,
    tinhCachNhuocDiem: kqTongQuan.tinhCachNhuocDiem,
    ngheNghiep: kqTongQuan.ngheNghiep,
    loiKhuyenCaiVan: kqTongQuan.loiKhuyenCaiVan,
    menhChu: kqTongQuan.tinhChat + ' ' + kqTongQuan.nguHanh,
    napAm: kqTongQuan.napAm,
    tuongTac: kqTongQuan.tuongTac,
    luanGiai: kqTongQuan.luanGiai,
    luanGiaiNam: kqTongQuan.luanGiaiNam,
    luanGiaiNu: kqTongQuan.luanGiaiNu,
    luanGiaiGioiTinh: luanGiaiGioiTinh,
    ketQuaThanVuongNhuoc: kqTongQuan.ketQuaThanVuongNhuoc,
    loiKhuyenNoiLuc: kqTongQuan.loiKhuyenNoiLuc,
    dungThan: kqTongQuan.dungThan,
    iconHanh: kqTongQuan.iconHanh,
    hyThan: kqTongQuan.hyThan,
    iconHy: kqTongQuan.iconHy,
    mauSacHop: kqTongQuan.mauSacHop,
    mauSacKy: kqTongQuan.mauSacKy,
    tuTruChiTietHTML: kqTongQuan.tuTruChiTietHTML,
    tuongTacCacTru: kqTongQuan.tuongTacCacTru,
    moTaLuanDungThanChu: kqTongQuan.moTaLuanDungThanChu,
    phanTramNguHanhMang: kqTongQuan.phanTramNguHanhMang,
    vatPhamBoTroText: kqTongQuan.vatPhamBoTroText,
    dacTrungCauTrucText: kqTongQuan.dacTrungCauTrucText,
    chiTietDanhGia: chiTietDanhGia,

    // TamTai.gs
    tuoiMu: tuoiMu,
    gioiTinh: kqHanPhuongDong.gioiTinh,
    tamTai: kqHanPhuongDong.tamTai,
    kimLau: kqHanPhuongDong.kimLau,
    hoangOc: kqHanPhuongDong.hoangOc,
    cuuDieu: kqHanPhuongDong.cuuDieu,

    // GiaoThoaDongTay.gs
    giaoThoaDongTay: { doiChieu: kqGiaoThoa.doiChieu, trangThai: kqGiaoThoa.trangThai, isHop: kqGiaoThoa.isHop, moTa: kqGiaoThoa.moTa },

    // HoangDao.gs
    zodiacSign: kqCungTay.tenCung,
    zodiacElement: kqCungTay.nguyenTo,
    moonSign: moonSign,
    ascendant: ascendant,

    // BatTrach.gs
    batTrach: {
      cungPhi: batTrachObj.cungPhi, menhCung: batTrachObj.menhCung, nhomHuong: batTrachObj.nhomHuong,
      totArr: batTrachObj.huongTot, xauArr: batTrachObj.huongXau
    },
    mauCungPhiHop: mauCungPhi.hop,
    mauCungPhiKy: mauCungPhi.ky,

    // ThanSo.gs
    thanSo: {
      counts: kqThanSo.counts, muiTenSoHuu: kqThanSo.muiTenSoHuu, muiTenTrong: kqThanSo.muiTenTrong,
      lineIds: kqThanSo.lineIds, pyramid: kqThanSo.pyramid
    },

    // Huyền Không
    huyenKhong: { nam: namHienTai, saoTrungCung: hk.saoTrungCung, mangSaoPhuongVi: hk.mangSaoPhuongVi },

    // Đại Vận
    tuoiKhoiDaiVanThucTe: khoiVan.tuoi,
    danhSachCanChiDaiVan: danhSachCanChiDaiVan
  };
}

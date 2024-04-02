
const FooterClient = () => {
    return (
        <>
            <div className=" py-6 border-y">
                <div className="lg:w-[950px] m-auto mb-6">
                    <div className="flex gap-5 justify-between text-xs">
                        <div className="flex flex-col gap-2">
                            <h2 className=" text-sm font-semibold">Hỗ trợ khách hàng</h2>
                            <p>Trung tâm trợ giúp</p>
                            <p>An toàn mua bán</p>
                            <p>Liên hệ hỗ trợ</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className=" text-sm font-semibold">Về chúng tôi</h2>
                            <p>Giới thiệu</p>
                            <p>Quy chế hoạt động sàn</p>
                            <p>Chính sách bảo mật</p>
                            <p>Giải quyết tranh chấp</p>
                        </div>
                        <div>
                            <h2 className=" text-sm font-semibold">Liên kết</h2>
                            <div className=" flex gap-2 text-lg py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                    <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 100 100">
                                    <path fill="#de333b" d="M88.927,33.79c-0.285-3.583-1.501-6.406-3.35-8.63c-0.051-0.094-0.096-0.188-0.147-0.281	c-0.701-1.261-1.649-2.012-2.684-2.359c-5.71-4.186-14.318-5.295-21.448-5.697c-7.475-0.421-14.968-0.281-22.445,0.022	c-4.78,0.193-10.406-0.249-15.119,1.364c-5.947-0.306-9.869,2.976-12.367,7.8c-1.339,1.943-2.308,4.179-2.786,6.623	c-0.143,0.734-0.152,1.403-0.076,2.019c-1,5.058-1.186,10.445-0.936,14.854c-0.085,0.367-0.145,0.742-0.146,1.131	c-0.002,2.131,0.256,4.182,0.673,6.195c-0.009,0.151-0.014,0.301-0.018,0.451c-0.008-0.001-0.016-0.001-0.024-0.002	c0.005,0.052,0.016,0.101,0.021,0.153c-0.131,5.471,2.194,10.197,6.9,13.459c2.01,1.393,4.191,2.27,6.46,2.808	c6.826,4.016,16.184,3.296,23.76,3.357c11.133,0.09,22.299-0.74,32.876-4.387c0.237-0.034,0.477-0.079,0.722-0.143	c9.043-2.386,10.127-12.368,10.981-20.258C90.461,45.92,90.412,39.733,88.927,33.79z"></path><path fill="#de333b" d="M60.734,32.231c-0.412-0.087-0.815-0.196-1.215-0.328c0.443,0.155,0.885,0.31,1.328,0.465	c-0.664-0.236-1.291-0.532-1.894-0.896c-1.129-0.68-2.915-0.716-4.133-0.33c-1.302,0.413-2.683,1.505-3.252,2.773	c-0.573,1.275-0.826,2.783-0.33,4.133c0.532,1.449,1.449,2.455,2.773,3.252c1.348,0.812,2.902,1.366,4.437,1.689	c1.382,0.291,2.954,0.003,4.139-0.767c1.131-0.735,2.156-2.115,2.384-3.469C65.464,35.82,63.743,32.864,60.734,32.231L60.734,32.231	z"></path><path fill="#de333b" d="M56.78,46.53c7.1,0,6.544-10.99-0.517-10.99C49.163,35.54,49.719,46.53,56.78,46.53L56.78,46.53z"></path><path fill="#de333b" d="M11.152,66.211c0.954,1.928,3.004,2.821,4.473,4.262c4.395,4.31,11.909-2.064,8.264-7.11	c-1.301-1.802-4.297-4.4-4.991-5.36c-4.248-5.883-12.249-0.247-9.225,5.991c7.802,16.098,29.343,12.253,43.525,10.658	c7.015-0.789,6.526-11.781-0.517-10.99c-6.449,0.725-13.217,1.617-19.698,1.647c-5.583,0.025-11.491-1.955-14.085-7.306	c-3.075,1.997-6.15,3.994-9.225,5.991c1.301,1.802,4.297,4.4,4.991,5.36c2.755-2.37,5.51-4.74,8.264-7.11	c-0.618-0.606-2.497-1.914-2.551-2.023C17.242,53.888,8.043,59.932,11.152,66.211L11.152,66.211z"></path><path fill="#f2f2f2" d="M61.507,44.549c-0.218-0.422-0.559-0.822-1.072-1.17c-5.329-3.613-10.658-7.227-15.987-10.84	c-2.934-1.989-6.549,0.883-5.871,3.497c-0.52,3.454-0.389,7.168-0.1,10.864c-0.12,3.702-0.089,7.405,0.155,11.125	c0.142,2.166,1.836,3.202,3.522,3.204c0.765,0.141,1.574,0.04,2.324-0.432c5.571-3.509,10.955-7.269,16.169-11.29	C62.356,48.189,62.618,46.085,61.507,44.549z"></path><path d="M12.916,30.202c0,0-0.077,0.17-0.228,0.501c-0.141,0.335-0.395,0.817-0.646,1.483c-0.538,1.317-1.213,3.317-1.768,5.975	c-0.565,2.656-0.933,5.973-1.036,9.827c-0.083,3.87,0.044,8.207,0.383,13.085c0.229,2.434,0.699,5.118,2.067,7.611	c1.341,2.48,3.411,4.653,5.871,6.327c2.46,1.687,5.269,2.964,8.254,3.881c2.994,0.918,6.117,1.515,9.351,1.912	c6.475,0.782,13.257,0.666,20.22,0.368c6.978-0.333,14.271-1.043,21.569-2.885c1.813-0.453,3.651-0.968,5.459-1.709	c1.801-0.738,3.586-1.736,5.091-3.143c1.513-1.407,2.622-3.14,3.399-4.898c0.781-1.765,1.276-3.564,1.658-5.323	c1.449-6.981,1.748-13.869,1.161-20.351c-0.145-1.62-0.342-3.215-0.598-4.778c-0.253-1.563-0.545-3.12-0.988-4.648	c-0.439-1.525-1.019-3.021-1.818-4.4c-0.791-1.381-1.834-2.624-2.994-3.62c-2.333-2.006-4.997-3.19-7.548-4.064	c-2.571-0.87-5.111-1.388-7.533-1.732c-4.856-0.653-9.237-0.722-13.079-0.759c-3.843-0.011-7.146,0.098-9.842,0.214	c-5.392,0.242-8.367,0.457-8.367,0.457s3.009,0.027,8.374,0.076c2.694,0.044,5.989,0.122,9.803,0.332	c3.805,0.235,8.164,0.522,12.837,1.364c2.331,0.437,4.738,1.038,7.121,1.952c2.375,0.915,4.763,2.118,6.679,3.897	c1.934,1.747,3.146,4.186,3.84,6.971c0.357,1.385,0.591,2.853,0.792,4.36c0.205,1.508,0.353,3.043,0.453,4.601	c0.41,6.221-0.018,12.833-1.478,19.421c-0.734,3.227-1.895,6.394-4.162,8.454c-2.262,2.096-5.608,3.15-9.092,4.019	c-6.981,1.763-14.052,2.514-20.911,2.933c-6.88,0.388-13.524,0.626-19.735,0.031c-6.192-0.599-12.068-1.953-16.626-4.874	c-2.274-1.433-4.145-3.274-5.399-5.379c-1.268-2.095-1.814-4.485-2.136-6.814c-0.538-4.721-0.884-9.101-0.998-12.89	c-0.096-3.803,0.081-7.085,0.482-9.735c0.391-2.651,0.933-4.675,1.381-6.017c0.207-0.678,0.426-1.173,0.544-1.518	C12.851,30.378,12.916,30.202,12.916,30.202z"></path><path fill="#eb5d46" d="M28.215,24.148c-9.894,2.029-11.92,12.621-11.979,21.179c-0.02,2.95,2.893,3.95,4.969,3.047	c0.586-0.057,1.17-0.248,1.696-0.556c1.719-0.018,3.389-1.135,3.347-3.374c-0.006-0.297-0.017-0.63-0.029-0.979	c-0.061-2.763,0.123-5.521,1.265-8.09c1.113-2.502,3.401-3.779,4.683-6.085C33.715,26.507,31.172,23.542,28.215,24.148z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t pt-5">
                    <div className=" text-xs text-gray-500 text-center">
                        <p>CÔNG TY TNHH CHỢ TỐT - Người đại diện theo pháp luật: Nguyễn Trọng Tấn; GPDKKD: 0312120782 do sở KH & ĐT TP.HCM cấp ngày 11/01/2013;</p>
                        <p>GPMXH: 17/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 15/01/2019 - Chịu trách nhiệm nội dung: Trần Minh Ngọc.</p>
                        <p>Địa chỉ: Tầng 18, Toà nhà UOA, Số 6 đường Tân Trào, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh, Việt Nam; Email: trogiup@chotot.vn - Tổng đài CSKH: 19003003 (1.000đ/phút)</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FooterClient
import axios from 'axios';

// 액세스 토큰을 가져오는 함수
const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

// 리프레시 토큰을 가져오는 함수
const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

// 새로 갱신된 액세스 토큰을 로컬 스토리지에 저장하는 함수
const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: 모든 요청에 액세스 토큰을 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// 응답 인터셉터: 액세스 토큰 만료 시 자동으로 리프레시 토큰을 사용해 갱신
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 액세스 토큰 만료인 경우 처리
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();

            // 리프레시 토큰으로 새 액세스 토큰을 요청
            try {
                const response = await axios.post('http://localhost:8000/users/token/refresh/', {
                    refresh: refreshToken,
                });

                // 새로 발급받은 액세스 토큰을 저장하고 헤더에 추가
                const newAccessToken = response.data.access;
                setAccessToken(newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // 다시 요청을 보내도록 설정
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // 리프레시 토큰이 만료되었거나 유효하지 않은 경우 처리
                console.error('Token refresh error:', refreshError);
                // 필요한 경우 여기서 로그아웃을 처리하거나 다른 대응을 할 수 있습니다.
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;


//401,403(access 만기): refresh 한번 더
//isloggedin
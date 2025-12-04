import { useState } from 'react';
import { authAPI } from '../../services/api';
import './Login.css';

export default function Login() {
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Login form state
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	// Register form state
	const [registerData, setRegisterData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	// Email validation
	const isValidEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	// Handle login input change
	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prev) => ({ ...prev, [name]: value }));
		setError('');
	};

	// Handle register input change
	const handleRegisterChange = (e) => {
		const { name, value } = e.target;
		setRegisterData((prev) => ({ ...prev, [name]: value }));
		setError('');
	};

	// Handle login submission
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!loginData.email.trim()) {
			setError('Email is required');
			return;
		}

		if (!isValidEmail(loginData.email)) {
			setError('Please enter a valid email');
			return;
		}

		if (!loginData.password.trim()) {
			setError('Password is required');
			return;
		}

		if (loginData.password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}

		setLoading(true);

		try {
			const response = await authAPI.login(loginData);

			if (response.user && response.token) {
				// Store user data and token in localStorage
				localStorage.setItem('authToken', response.token);
				localStorage.setItem('userId', response.user._id);
				localStorage.setItem('userEmail', response.user.email);
				localStorage.setItem('userName', response.user.name);
				if (response.patient) {
					localStorage.setItem('patientId', response.patient._id);
				}
				window.location.href = '/dashboard';
			}
		} catch (err) {
			setError(err.response?.data?.error || 'Invalid email or password');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Handle register submission
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!registerData.name.trim()) {
			setError('Name is required');
			return;
		}

		if (!registerData.email.trim()) {
			setError('Email is required');
			return;
		}

		if (!isValidEmail(registerData.email)) {
			setError('Please enter a valid email');
			return;
		}

		if (!registerData.password.trim()) {
			setError('Password is required');
			return;
		}

		if (registerData.password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}

		if (registerData.password !== registerData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		setLoading(true);

		try {
			const response = await authAPI.register({
				user: {
					name: registerData.name,
					email: registerData.email,
					password: registerData.password,
				},
				patient: {}
			});

			if (response.user && response.token) {
				setError('');
				// Auto-login after registration
				localStorage.setItem('authToken', response.token);
				localStorage.setItem('userId', response.user._id);
				localStorage.setItem('userEmail', response.user.email);
				localStorage.setItem('userName', response.user.name);
				if (response.patient) {
					localStorage.setItem('patientId', response.patient._id);
				}
				alert('Registration successful! Redirecting to dashboard...');
				setTimeout(() => {
					window.location.href = '/dashboard';
				}, 1000);
			}
		} catch (err) {
			setError(err.response?.data?.error || 'Registration failed. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<div className="login-box">
					{isLogin ? (
						// LOGIN FORM
						<>
							<h1 className="login-title">Login</h1>
							<p className="login-subtitle">Sign in to your account</p>

							{error && <div className="error-alert">{error}</div>}

							<form onSubmit={handleLoginSubmit} className="login-form">
								<div className="form-group">
									<label htmlFor="login-email">Email</label>
									<input
										type="email"
										id="login-email"
										name="email"
										placeholder="Enter your email"
										value={loginData.email}
										onChange={handleLoginChange}
										disabled={loading}
										autoComplete="email"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="login-password">Password</label>
									<input
										type="password"
										id="login-password"
										name="password"
										placeholder="Enter your password"
										value={loginData.password}
										onChange={handleLoginChange}
										disabled={loading}
										autoComplete="current-password"
									/>
								</div>

								<button type="submit" className="login-btn" disabled={loading}>
									{loading ? 'Signing in...' : 'Sign In'}
								</button>
							</form>

							<div className="login-footer">
								<a href="#forgot">Forgot password?</a>
								<span> | </span>
								<button
									type="button"
									className="toggle-btn"
									onClick={() => {
										setIsLogin(false);
										setError('');
										setLoginData({ email: '', password: '' });
									}}
									disabled={loading}
								>
									Register here
								</button>
							</div>
						</>
					) : (
						// REGISTER FORM
						<>
							<h1 className="login-title">Register</h1>
							<p className="login-subtitle">Create a new account</p>

							{error && <div className="error-alert">{error}</div>}

							<form onSubmit={handleRegisterSubmit} className="login-form">
								<div className="form-group">
									<label htmlFor="register-name">Full Name</label>
									<input
										type="text"
										id="register-name"
										name="name"
										placeholder="Enter your full name"
										value={registerData.name}
										onChange={handleRegisterChange}
										disabled={loading}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="register-email">Email</label>
									<input
										type="email"
										id="register-email"
										name="email"
										placeholder="Enter your email"
										value={registerData.email}
										onChange={handleRegisterChange}
										disabled={loading}
										autoComplete="email"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="register-password">Password</label>
									<input
										type="password"
										id="register-password"
										name="password"
										placeholder="Enter your password"
										value={registerData.password}
										onChange={handleRegisterChange}
										disabled={loading}
										autoComplete="new-password"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="register-confirm">Confirm Password</label>
									<input
										type="password"
										id="register-confirm"
										name="confirmPassword"
										placeholder="Confirm your password"
										value={registerData.confirmPassword}
										onChange={handleRegisterChange}
										disabled={loading}
										autoComplete="new-password"
									/>
								</div>

								<button type="submit" className="login-btn" disabled={loading}>
									{loading ? 'Creating account...' : 'Register'}
								</button>
							</form>

							<div className="login-footer">
									<button
										type="button"
										className="toggle-btn"
										onClick={() => {
											setIsLogin(true);
											setError('');
											setRegisterData({
												name: '',
												email: '',
												password: '',
												confirmPassword: '',
											});
										}}
									disabled={loading}
								>
									Back to Login
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
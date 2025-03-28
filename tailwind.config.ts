
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    // darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	  ],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			pdf: {
    				blue: '#4080FF',
    				indigo: '#3A3BF9',
    				lightBlue: '#F0F7FF',
    				lightGray: '#F8F9FC'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'slide-in-right': {
    				'0%': {
    					transform: 'translateX(100%)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateX(0)',
    					opacity: '1'
    				}
    			},
    			'slide-out-left': {
    				'0%': {
    					transform: 'translateX(0)',
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'translateX(-100%)',
    					opacity: '0'
    				}
    			},
    			'fade-in': {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			'pulse-soft': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.8'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-5px)'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'slide-in-right': 'slide-in-right 0.5s ease-out',
    			'slide-out-left': 'slide-out-left 0.5s ease-out',
    			'fade-in': 'fade-in 0.5s ease-out',
    			'pulse-soft': 'pulse-soft 2s infinite ease-in-out',
    			float: 'float 3s infinite ease-in-out'
    		},
    		backgroundImage: {
    			'dot-pattern': 'radial-gradient(circle, #e0e7ff 1px, transparent 1px)',
    			'gradient-soft': 'linear-gradient(to right, rgba(240, 249, 255, 0.2), rgba(224, 242, 254, 0.5))'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

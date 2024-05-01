# Leave Tracker

Leave Tracker is a web application developed using the Laravel framework for tracking employee leaves. It allows employees to submit leave requests, view their leave history, and enables administrators to manage user accounts and leave requests.

## Technologies Used
- PHP "^8.1"
- Laravel "^10.10"
- Vuejs
- Pinia

## Key Features
- User Authentication: Employees can register an account or log in if they already have one. Admins have special privileges to manage user accounts and leave requests.
- Leave Request Submission: Employees can submit leave requests specifying the type of leave (Casual, Sick, Emergency), start date, end date, and reason.
- Leave Approval Workflow: Admins can review pending leave requests and approve or reject them.
- Leave History: Employees can view their leave history, including past leave requests and their statuses.
- Dashboard: Admins have access to a dashboard displaying statistics such as total leave requests, pending, approved, and rejected requests.
- Email Notifications: Automated email notifications are sent to employees upon submission, approval, or rejection of leave requests.

## Installation
1. Clone the repository: `git clone https://github.com/Md-khaled/LeaveTracker.git`
2. Navigate to the project directory: `cd LeaveTracker`
3. Install Composer dependencies: `composer install`
4. Copy the .env.example file to .env: `cp .env.example .env`
5. Configure your environment variables like database connection in .env file
6. Generate a new application key: `php artisan key:generate`
7. Run database migrations: `php artisan migrate:fresh --seed`
8. Install npm dependencies: `npm install`
9. Compile assets: `npm run dev`
10. Serve the application: `php artisan serve`

The application will be available at http://your_domain.

## Admin and Employee Access Authentication
- Admin Access: URL - http://your_domain/admin/login
- Employee Access: URL - http://your_domain/login

Run the seeder command to get the login credentials:

```bash
php artisan db:seed

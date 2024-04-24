export interface Course {
    id: number,
    name: string,
    account_id: 1,
    uuid: string,
    start_at: string;
    grading_standard_id: number;
    is_public: boolean;

    created_at: string;
    course_code: string;
    default_view: string;
    root_account_id: number;
    enrollment_term_id: number;
    license: string;
    grade_passback_setting?: any;
    end_at: string;
    public_syllabus: boolean;
    public_syllabus_to_auth: boolean;
    storage_quota_mb: number;
    is_public_to_auth_users: boolean;
    homeroom_course: boolean;
    course_color: any;
    friendly_name: any;
    apply_assignment_group_weights: boolean;

    calendar: {
        ics: string
    };
    time_zone: string;
    blueprint: boolean;
    template: boolean;
    enrollments: [
        {
            type: string;
            role: string;
            role_id: number;
            user_id: number;
            enrollment_state: string;
            limit_privileges_to_course_section: boolean;
            computed_current_grade: string;
            computed_current_score: number;
            computed_current_letter_grade: string;
            computed_final_grade: string;
            computed_final_score: number;
        }
    ],
    hide_final_grades: boolean;
    workflow_state: string;
    restrict_enrollments_to_course_dates: boolean;
}
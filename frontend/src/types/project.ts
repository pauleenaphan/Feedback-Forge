export interface Project{
    _id: string;
    owner: {
        _id: string; 
        username: string; 
    };
    name: string;
    shortDescription: string;
    longDescription: string;
    techStack: string[];
    datePosted: string;
    githubLink: string;
    liveSiteLink: string;
    comments: string[];
}

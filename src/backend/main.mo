import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(cs1 : ContactSubmission, cs2 : ContactSubmission) : Order.Order {
      Int.compare(cs2.timestamp, cs1.timestamp);
    };
  };

  type CompanyStats = {
    years : Nat;
    projects : Nat;
    offices : Nat;
    employees : Nat;
  };

  type Service = {
    title : Text;
    description : Text;
    iconName : Text;
  };

  type TeamMember = {
    name : Text;
    role : Text;
    bio : Text;
  };

  type Project = {
    title : Text;
    description : Text;
    category : Text;
    imageUrl : Text;
  };

  type Testimonial = {
    author : Text;
    role : Text;
    company : Text;
    quote : Text;
  };

  let services = List.empty<Service>();
  let teamMembers = List.empty<TeamMember>();
  let projects = List.empty<Project>();
  let testimonials = List.empty<Testimonial>();

  var companyStats : ?CompanyStats = null;

  let contactFormSubmissions = Map.empty<Time.Time, ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, subject : Text, message : Text) : async () {
    let timestamp = Time.now();
    let submission : ContactSubmission = {
      name;
      email;
      subject;
      message;
      timestamp;
    };
    contactFormSubmissions.add(timestamp, submission);
  };

  public query ({ caller }) func getAllContactFormSubmissions() : async [ContactSubmission] {
    contactFormSubmissions.values().toArray().sort();
  };

  public query ({ caller }) func getCompanyStats() : async CompanyStats {
    switch (companyStats) {
      case (null) { Runtime.trap("No company stats found") };
      case (?stats) { stats };
    };
  };

  public query ({ caller }) func getServices() : async [Service] {
    services.toArray();
  };

  public query ({ caller }) func getTeamMembers() : async [TeamMember] {
    teamMembers.toArray();
  };

  public query ({ caller }) func getProjects() : async [Project] {
    projects.toArray();
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.toArray();
  };
};

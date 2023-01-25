export interface ProjectsResponse {
  meta: Meta;
  route: Route;
  views: Views;
}

export interface Meta {
  status: number;
  redirect: null;
}

export interface Route {
  type: string;
  Solutions: Solution[];
}

export interface Solution {
  name: string;
  solutionID: string;
  customer: Customer;
  projectManager: CustomerContact | null;
  techcontact: CustomerContact | null;
  customerContact: CustomerContact | null;
  projects: Project[];
  projectDescription: string;
  repositoryUrl: string;
  serviceagreement: string;
  solutionUrls: SolutionURL[];
  frameworks: Framework[];
  environments: Environment[];
  versionReporter: VersionReporter[];
  configValues: ConfigValue[];
}

export interface ConfigValue {
  content: ConfigValueContent;
  contentType: string;
}

export interface ConfigValueContent {
  configKey: string;
  configValue: string;
}

export interface Customer {
  id: string;
  view: CustomerView;
  type: CustomerType;
}

export enum CustomerType {
  ViewReference = "ViewReference",
}

export interface CustomerView {
  name: string;
  hqcustomerId: string;
}

export interface CustomerContact {
  id: string;
  view: CustomerContactView;
  type: CustomerType;
}

export interface CustomerContactView {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Environment {
  content: EnvironmentContent;
  contentType: ContentType;
}

export interface EnvironmentContent {
  environmentName: string;
  environmentDescription: string;
  environmentUrls: SolutionURL[];
  pingdomId: number;
  hostingSetup: string;
  hostingAccess: string;
  buildSetup: string;
  buildSetupLink: SolutionURL[];
  buildSetupBadge: SolutionURL[];
  deploysetup: string;
  deploySetupLink: SolutionURL[];
  deploySetupBadge: SolutionURL[];
  latestDeployDate: LatestDeployDate;
  recoveryInstructions: string;
}

export interface SolutionURL {
  name: string;
  target: Target;
  type: SolutionURLType;
  id: ID;
  url: string;
}

export enum ID {
  Empty = "",
  The1094EnUs = "1094-en-us",
}

export enum Target {
  Blank = "_blank",
  Empty = "",
}

export enum SolutionURLType {
  Content = "Content",
  External = "External",
}

export enum LatestDeployDate {
  The01010001000000 = "01/01/0001 00:00:00",
  The01032021230000 = "01/03/2021 23:00:00",
  The01032021234900 = "01/03/2021 23:49:00",
  The11162020163200 = "11/16/2020 16:32:00",
  The12142020133000 = "12/14/2020 13:30:00",
  The12212020155500 = "12/21/2020 15:55:00",
  The12242020120000 = "12/24/2020 12:00:00",
}

export enum ContentType {
  Environment = "environment",
}

export interface Framework {
  content: FrameworkContent;
}

export interface FrameworkContent {
  frameworkName: string;
  frameworkVersion: string;
}

export interface Project {
  novicellAssets: NovicellAssets;
  name: string;
  url: string;
}

export interface NovicellAssets {
  id: string;
  view: NovicellAssetsView;
  type: CustomerType;
}

export interface NovicellAssetsView {
  name: string;
  hqprojectId: string;
  jiraId: string;
  confluenceId: string;
}

export interface VersionReporter {
  content: FrameworkContent;
  contentType: string;
}

export interface Views {}

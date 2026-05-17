---
title: EKS topics
description: A list of EKS topics
time: 03:02:57
date: 17-02-2026
---

# 🧠 **Amazon EKS — Advanced Mastery Roadmap**

## 1️⃣ **EKS Architecture Internals**

![Image](https://docs.aws.amazon.com/images/architecture-diagrams/latest/modernize-applications-with-microservices-using-amazon-eks/images/modernize-applications-with-microservices-using-amazon-eks.png)

![Image](https://docs.aws.amazon.com/images/eks/latest/best-practices/images/reliability/eks-data-plane-connectivity.jpeg)

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2020/04/10/eks_architecture-1120x630.png)

Learn what AWS hides from you and what you still control:

- EKS Control Plane (API server, etcd, scheduler)
    
- AWS managed vs self-managed components
    
- How EKS integrates with:
    
    - EC2
        
    - IAM
        
    - VPC
        
    - ELB
        
- EKS shared responsibility model
    
- How upgrades actually work internally
    

**Pro Hack**

> Use **multiple EKS clusters per environment** instead of namespaces for isolation. It improves blast radius control and security.

---

## 2️⃣ **IAM, IRSA & Zero-Trust Kubernetes**

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AQGunaPLP0fLmr7KYs9fN7A.png)

![Image](https://media2.dev.to/cdn-cgi/image/width%3D800%2Cheight%3D%2Cfit%3Dscale-down%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcz2cr05buzwr0q0v2ku7.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2022/02/26/Screen-Shot-2022-02-25-at-9.23.07-PM.png)

- IAM Roles for Service Accounts (IRSA)
    
- OIDC providers
    
- Fine-grained pod-level permissions
    
- AWS STS inside pods
    
- Replacing node IAM roles
    

**Pro Hack**

> Never give nodes AWS permissions.  
> Use IRSA for **everything** (ECR, S3, DynamoDB, Secrets Manager).

---

## 3️⃣ **Advanced Networking (Where most people fail)**

![Image](https://docs.aws.amazon.com/images/eks/latest/best-practices/images/networking/cni_image-2.png)

![Image](https://www.eksworkshop.com/assets/images/overview-d120e763db5388b832bc3430ac1d7527.webp)

![Image](https://miro.medium.com/0%2A8-45FoyF6zBayVPw.png)

- VPC CNI deep dive
    
- IP exhaustion & prefix delegation
    
- Security Groups for Pods
    
- Calico vs Cilium vs AWS Network Policy
    
- Ingress vs ALB vs NLB
    
- Multi-AZ traffic engineering
    

**Pro Hack**

> Use **Security Groups for Pods** to make Kubernetes workloads comply with corporate firewall rules.

---

## 4️⃣ **Cluster Autoscaling at Scale**

![Image](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2021/11/23/2021-karpenter-diagram.png)

![Image](https://docs.aws.amazon.com/images/eks/latest/best-practices/images/autoscaling/cas_architecture.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2019/11/16/eks-api-evolution-1260x610.png)

- Cluster Autoscaler vs **Karpenter**
    
- Spot instance diversification
    
- Capacity-optimized scheduling
    
- Pod-based scaling
    
- Cold-start elimination
    

**Pro Hack**

> Karpenter reduces AWS compute cost by **40–70%** compared to managed node groups.

---

## 5️⃣ **Production-Grade Storage**

![Image](https://devopscube.com/content/images/2025/03/ebs-csi-driver-1.gif)

![Image](https://www.eksworkshop.com/assets/images/efs-storage-ffc3bb4d0971fa00f17956d14ecd3b71.webp)

![Image](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2022/10/28/4.Dynamic-Provisioning.png)

- EBS CSI
    
- EFS CSI
    
- FSx for Lustre
    
- StatefulSets in EKS
    
- Zonal vs regional volumes
    
- Backup & restore (Velero)
    

**Pro Hack**

> Use **EFS for shared volumes** and **EBS for databases**.

---

## 6️⃣ **EKS Security Hardening**

![Image](https://docs.aws.amazon.com/images/eks/latest/best-practices/images/security/SRM-MNG.jpg)

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2020/06/07/K8sOperator.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2022/10/26/pod-2.jpg)

- Pod Security Standards
    
- OPA Gatekeeper
    
- Kyverno
    
- Runtime scanning (Falco)
    
- Supply chain security (Sigstore, Cosign)
    
- Secrets Manager integration
    

**Pro Hack**

> Block `:latest` images using policy engines — it prevents production disasters.

---

## 7️⃣ **Observability & SRE Tooling**

![Image](https://user-images.githubusercontent.com/78129381/153623445-bed0eb98-3c4d-41ae-b8b7-45a062b3e090.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2022/04/20/Addon-2-908x630.png)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2019/08/08/CI-ECSServiceScaleup.png)

- Prometheus + Grafana
    
- AWS Managed Prometheus
    
- OpenTelemetry
    
- CloudWatch Container Insights
    
- Distributed tracing
    
- Error budgets & SLOs
    

**Pro Hack**

> Alert on **request latency and saturation**, not pod CPU.

---

## 8️⃣ **EKS CI/CD & GitOps**

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2022/11/01/kwong.png)

![Image](https://d2908q01vomqb2.cloudfront.net/7719a1c782a1ba91c031a682a0a2f8658209adbf/2021/03/09/diagram.png)

![Image](https://cdn.prod.website-files.com/68ad5281556da93bd7179b0e/68b79e833f0b9adbf3cbd940_65dd9e619ce768e96c0cabba_KKz6JTi.png)

- GitOps with ArgoCD & Flux
    
- Blue-Green deployments
    
- Canary deployments
    
- Helm vs Kustomize
    
- Progressive delivery
    

**Pro Hack**

> Git is your **single source of truth** — no `kubectl apply` in prod.

---

## 9️⃣ **Multi-Cluster & Multi-Region EKS**

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2021/12/13/Onfido-1-1024x429.png)

![Image](https://dam.nttdata.com/api/public/content/157504-Kubernetes-Federation_Blog.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fe2ef495a1152561572949784c16bf23abb28057/2020/12/05/image-10.jpg)

- Cross-region failover
    
- Route53 + ALB
    
- Global service mesh
    
- DR strategies
    
- Data replication
    

**Pro Hack**

> Use **Route53 latency routing** to load balance between clusters globally.

---

## 🔟 **Cost Optimization (FinOps for EKS)**

![Image](https://cdn.prod.website-files.com/635e4ccf77408db6bd802ae6/67eb93c09599be98479f1aec_AD_4nXfQ0fa8hFqnQpP3g2RBIU5SyG4PDyNhLny4A2Snv7wYXW5BCibh6QY_hP8rvz6BvpesnuVM-D8kNJbf7MAlEXUKIGpxgMFDZlXbJeRpcJWrN8-xVL1GOSszUUuNQ54iGnWckXRBsA.jpeg)

![Image](https://grafana.com/mw/_next/image/?q=75&url=https%3A%2F%2Fs3.amazonaws.com%2Fa-us.storyblok.com%2Ff%2F1022730%2F10bf4b0b79%2Fk8s-cost-monitoring-2.jpg&w=3840)

![Image](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2018/08/30/EKS-Spot-Blog.png)

- Spot instances
    
- Savings plans
    
- Rightsizing
    
- Idle cluster detection
    
- Namespace-based billing
    

**Pro Hack**

> Use **spot for everything except system pods**.

---

## 11️⃣ **Platform Engineering with EKS**

![Image](https://learn.microsoft.com/en-us/samples/azure-samples/aks-platform-engineering/aks-platform-engineering/media/aks-platform-engineering-architecture.png)

![Image](https://docs.aws.amazon.com/images/prescriptive-guidance/latest/internal-developer-platform/images/internal-developer-platform-core-components.png)

![Image](https://backstage.io/assets/images/backstage-k8s-2-deployments-36ca3f831747105e25f3e69e7e459032.png)

- Multi-tenant clusters
    
- Backstage
    
- Internal PaaS
    
- Self-service deployment portals
    
- Golden paths
    

---

## 12️⃣ **Real-World EKS Hacks**

|Hack|What it solves|
|---|---|
|Use Karpenter + Spot|70% cheaper compute|
|IRSA everywhere|Zero-trust AWS access|
|Node pools per workload|Performance isolation|
|Separate system & app nodes|Stability|
|Pre-pull images|Faster deployments|
|HPA + Karpenter|Infinite scale|
|GitOps only|Zero-drift infra|


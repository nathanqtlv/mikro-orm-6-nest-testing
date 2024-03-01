type AuditInfoProps = {
  createdAt: Date;
  updatedAt: Date;
};

export class AuditInfo {
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor({
    createdAt,
    updatedAt,
  }: AuditInfoProps) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static newDefault(): AuditInfo {

    return new AuditInfo({
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

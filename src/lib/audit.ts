import 'server-only';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export type AuditResourceType = 'PAGE' | 'COMPONENT' | 'USER' | 'MEDIA' | 'OTHER' | 'CONTACT';

export type AuditActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH';

export interface AuditChangeInput {
  resourceId: string;
  resourceType?: AuditResourceType;
  field?: string;
  previousData?: Prisma.InputJsonValue;
  newData?: Prisma.InputJsonValue;
}

export interface CreateAuditLogParams {
  actorId: string;
  action: AuditActionType;
  resourceType: AuditResourceType;
  summary?: string;
  metadata?: Prisma.InputJsonValue;
  changes?: AuditChangeInput[];
}

export async function createAuditLog(params: CreateAuditLogParams): Promise<{ id: string }> {
  const { actorId, action, resourceType, summary, metadata, changes } = params;

  const log = await prisma.auditLog.create({
    data: {
      actorId,
      action,
      resourceType,
      summary,
      metadata,
      count: changes && changes.length > 0 ? changes.length : undefined
    }
  });

  if (changes && changes.length > 0) {
    await prisma.auditLogChange.createMany({
      data: changes.map(change => ({
        logId: log.id,
        resourceId: change.resourceId,
        resourceType: change.resourceType,
        field: change.field,
        previousData: change.previousData,
        newData: change.newData
      }))
    });
  }

  return { id: log.id };
}


